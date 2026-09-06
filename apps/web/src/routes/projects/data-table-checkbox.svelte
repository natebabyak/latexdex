<script lang="ts">
  import { Checkbox } from "#lib/components/ui/checkbox/index.ts";

  interface Props {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    indeterminate?: boolean;
  }

  let { checked, onCheckedChange, indeterminate }: Props = $props();
</script>

<Checkbox bind:checked={() => checked, onCheckedChange} {indeterminate} />
