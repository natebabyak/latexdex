<script lang="ts">
  import {
    DownloadIcon,
    FileXIcon,
    FunnelXIcon,
    SearchIcon,
    TagIcon,
    Trash2Icon,
  } from "@lucide/svelte";
  import { createTable, FlexRender } from "@tanstack/svelte-table";
  import { backOut } from "svelte/easing";
  import { fly } from "svelte/transition";

  import * as ButtonGroup from "#lib/components/ui/button-group/index.ts";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Empty from "#lib/components/ui/empty/index.ts";
  import * as InputGroup from "#lib/components/ui/input-group/index.ts";
  import * as Sidebar from "#lib/components/ui/sidebar/index.ts";
  import * as Table from "#lib/components/ui/table/index.ts";
  import { getProjects } from "#lib/projects.remote.ts";

  import { columns } from "./columns";
  import CreateProjectDialog from "./create-project-dialog.svelte";
  import { features } from "./features";
  import ProjectsSidebar from "./projects-sidebar.svelte";

  let projects = $derived(await getProjects());

  const table = createTable({
    features,
    columns,
    get data() {
      return projects;
    },
    initialState: {
      sorting: [
        {
          id: "updatedAt",
          desc: true,
        },
      ],
    },
  });
</script>

<svelte:head>
  <title>Projects - Texfolia</title>
  <meta name="description" content="TODO" />
</svelte:head>

<Sidebar.Provider>
  <ProjectsSidebar />
  <Sidebar.Inset>
    <main class="flex-1 space-y-4 py-4">
      <h1 class="px-4 text-2xl font-medium">Projects</h1>
      <div class="flex items-center justify-between px-4">
        <InputGroup.Root class="w-full max-w-xs">
          <InputGroup.Input
            placeholder="Search projects..."
            bind:value={() => table.atoms.globalFilter.get(), (v) => table.setGlobalFilter(v)}
          />
          <InputGroup.Addon>
            <SearchIcon />
          </InputGroup.Addon>
        </InputGroup.Root>
        {#key table.getSelectedRowIds().length}
          {let selectedRows = table.getSelectedRowIds().length}
          <div transition:fly={{ duration: 500, easing: backOut, x: 8 }}>
            {#if selectedRows > 0}
              <ButtonGroup.Root>
                <Button variant="outline">
                  <DownloadIcon />
                  Download
                </Button>
                <Button variant="outline">
                  <TagIcon />
                  Tag
                </Button>
                <Button variant="outline">
                  <Trash2Icon />
                  Delete
                </Button>
              </ButtonGroup.Root>
            {:else}
              <CreateProjectDialog />
            {/if}
          </div>
        {/key}
      </div>
      <svelte:boundary>
        <Table.Root>
          <Table.Caption>
            {table.getFilteredSelectedRowModel().rows.length}
            of
            {table.getFilteredRowModel().rows.length}
            row(s) selected
          </Table.Caption>
          <Table.Header>
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
              <Table.Row>
                {#each headerGroup.headers as header (header.id)}
                  <Table.Head>
                    <FlexRender {header} />
                  </Table.Head>
                {/each}
              </Table.Row>
            {/each}
          </Table.Header>
          <Table.Body>
            {#each table.getRowModel().rows as row (row.id)}
              <Table.Row>
                {#each row.getAllCells() as cell (cell.id)}
                  <Table.Cell>
                    <FlexRender {cell} />
                  </Table.Cell>
                {/each}
              </Table.Row>
            {:else}
              <Table.Row>
                <Table.Cell colspan={4}>
                  <Empty.Root>
                    <Empty.Header>
                      <Empty.Media variant="icon">
                        <FileXIcon />
                      </Empty.Media>
                      <Empty.Title>No Projects Found</Empty.Title>
                      <Empty.Description>
                        You haven't created any projects yet. Get started by creating your first
                        project.
                      </Empty.Description>
                    </Empty.Header>
                    <Empty.Content>
                      <div class="flex gap-2">
                        <CreateProjectDialog />
                        <Button variant="outline">
                          <FunnelXIcon />
                          Reset Filters
                        </Button>
                      </div>
                    </Empty.Content>
                  </Empty.Root>
                </Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      </svelte:boundary>
    </main>
  </Sidebar.Inset>
</Sidebar.Provider>
