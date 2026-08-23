<script lang="ts">
  import type * as PdfjsNS from "pdfjs-dist";
  import { onDestroy, onMount } from "svelte";

  import { Button } from "#lib/components/ui/button/index.ts";

  let { src }: { src: null | string | Uint8Array } = $props();
  let canvas = $state<HTMLCanvasElement>();
  let pageNumber = $state(1);
  let numPages = $state(0);
  let loading = $state(false);
  let error = $state<string | null>(null);

  let pdfjs: typeof PdfjsNS | null = null;
  let pdf: PdfjsNS.PDFDocumentProxy | null = null;
  let loadingTask: PdfjsNS.PDFDocumentLoadingTask | null = null;
  let cancelled = false;

  async function loadDocument() {
    if (!src) return;
    loading = true;
    error = null;
    cancelled = false;
    try {
      if (!pdfjs) {
        // Dynamic import keeps pdf.js (and DOMMatrix usage) out of SSR entirely
        pdfjs = await import("pdfjs-dist");
        const workerUrl = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
      }

      const params = typeof src === "string" ? { url: src } : { data: src };
      const task = pdfjs.getDocument(params);
      loadingTask = task;
      const doc = await task.promise;
      if (cancelled) {
        task.destroy();
        return;
      }
      pdf = doc;
      numPages = doc.numPages;
      pageNumber = 1;
      await renderPage();
    } catch (e) {
      if (!cancelled) {
        error = e instanceof Error ? e.message : "Failed to load PDF";
      }
    } finally {
      if (!cancelled) loading = false;
    }
  }

  async function renderPage() {
    if (!pdf || !canvas) return;
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const renderTask = page.render({ canvas, viewport });
    await renderTask.promise;
  }

  function goToPage(next: number) {
    pageNumber = next;
    renderPage();
  }

  onMount(() => {
    loadDocument();
  });

  onDestroy(() => {
    cancelled = true;
    loadingTask?.destroy();
    loadingTask = null;
    pdf = null;
  });
</script>

<div>
  <header>
    <Button>Compile</Button>
  </header>
  <canvas bind:this={canvas}></canvas>
</div>
