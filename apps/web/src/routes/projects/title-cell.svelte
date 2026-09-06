<script lang="ts">
  import { resolve } from "$app/paths";

  let { id, title }: { id: string; title: string } = $props();
</script>

<a
  href={resolve("/projects/[id]", {
    id: id,
  })}
  class="hover:underline"
>
  {title}
</a>
