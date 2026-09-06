<script lang="ts">
  import { resolve } from "$app/paths";
</script>

<footer class="border-t p-4">
  <div class="grid grid-cols-4">
    <div>
      <p>Texfolia</p>
      <nav>
        <ul>
          <li>
            <a href={resolve("/")}>Home</a>
          </li>
          <li>
            <a href={resolve("/projects")}>Editor</a>
          </li>
          <li>
            <a href={resolve("/")}>Hub</a>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <p>Legal</p>
      <nav>
        <ul>
          <li>
            <a href={resolve("/privacy")}>Privacy Policy</a>
          </li>
          <li>
            <a href={resolve("/terms")}>Terms of Service</a>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <p>Resources</p>
      <nav>
        <ul>
          <li>
            <a href={resolve("/")}>vs. Overleaf</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <p>&copy; Texfolia 2026. All rights reserved.</p>
</footer>
