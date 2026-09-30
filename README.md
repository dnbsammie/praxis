<div align="center">

  # Praxis LMS

  <picture>
    <source media="(prefers-color-scheme: dark)"
            srcset="./docs/img/praxis-dark.png">
    <source media="(prefers-color-scheme: light)"
            srcset="./docs/img/praxis-light.png">
    <img src="./docs/img/praxis-light.png"
        alt="Praxis Banners">
  </picture>
  <br>
  <p>
    <a href="https://github.com/dnbsammie/praxis/issues">
      <img src="https://img.shields.io/github/issues/dnbsammie/praxis" alt="Issues">
    </a>
    <a href="https://github.com/dnbsammie/praxis/stargazers">
      <img src="https://img.shields.io/github/stars/dnbsammie/praxis" alt="Stars">
    </a>
    <a href="https://github.com/dnbsammie/praxis/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/dnbsammie/praxis" alt="License">
    </a>
  </p>
</div>

## About The Project

<blockquote style="border-left: 4px solid #00c8ff; padding-left: 10px; color: #fafafa;">
Offline-first, self-paced technical training platform with structured, practical learning paths that build measurable skills. Connects learning to real-world job scenarios, ensuring relevant, applicable competencies aligned with the labor market real-world work scenarios, ensuring applicable and relevant skills for the job market.
</blockquote>

---

## Tech Stack

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=github,svelte,css,ts,vite,figma,githubactions,tauri,html,rust,pnpm,sqlite,&theme=dark&perline=6" alt="icons"/>
  </a>
</p>

---

## Project Setup
 
Praxis is a [Turborepo](https://turborepo.dev) monorepo managed with **pnpm**. The desktop/mobile shell is built with [Tauri v2](https://v2.tauri.app), so you need both a JavaScript toolchain and a Rust toolchain.
 
> **Supported development environments:** Windows, macOS and Linux. ChromeOS is a target platform for end users, not a development environment.
 
### 1. Install system dependencies
 
Tauri needs a few native libraries. Follow the section for your OS.
 
<details>
<summary><strong>Linux</strong> (Debian/Ubuntu shown)</summary>

```sh
sudo apt update
sudo apt install libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```
 
Other distributions (Arch, Fedora, Gentoo, openSUSE, Alpine, NixOS, OSTree) are listed in the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/#linux).
 
</details>

<details>
<summary><strong>macOS</strong></summary>
Desktop development only needs the Xcode Command Line Tools:
 
```sh
xcode-select --install
```
 
Install the full [Xcode](https://developer.apple.com/xcode/resources/) instead if you also plan to target iOS, and launch it once so it can finish setting up.
 
</details>

<details>
<summary><strong>Windows</strong></summary>

1. Install the [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) and select **Desktop development with C++**.

2. Install [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/#download-section) (Evergreen Bootstrapper). It is already included in Windows 10 (1803+) and Windows 11, so you can usually skip this.

3. Only if you build MSI installers: make sure the **VBSCRIPT** optional feature is enabled (*Settings → Apps → Optional features → More Windows features*).
</details>

### 2. Install Rust
 
Install Rust with [`rustup`](https://www.rust-lang.org/tools/install).
 
```sh
# Linux and macOS
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```
 
On **Windows**, use the installer from rust-lang.org and make sure the **MSVC** toolchain is the default host. If Rust is already installed:
 
```sh
rustup default stable-msvc
```
 
Restart your terminal afterwards.
 
### 3. Install Node.js and pnpm
 
1. Install the [Node.js](https://nodejs.org) **LTS** release.
2. Enable pnpm through Corepack (or follow the [pnpm installation guide](https://pnpm.io/installation)):
```sh
corepack enable
```
 
3. Check everything is available:
```sh
node -v
pnpm -v
rustc --version
```
 
### 4. (Optional) Install `turbo` globally
 
The repository already pins its own `turbo` version, and a global binary defers to it, so this step is optional. It lets you run `turbo build` directly instead of `pnpm exec turbo build`.
 
```sh
# macOS and Linux
curl -fsSL https://turborepo.dev/install | sh
```
 
```sh
# Windows x64 (PowerShell)
irm https://turborepo.dev/install.ps1 | iex
```
 
### 5. (Optional) Mobile targets
 
Only needed if you work on the Android or iOS builds. See the [Tauri mobile setup](https://v2.tauri.app/start/prerequisites/#configure-for-mobile-targets).
 
- **Android:** Android Studio, `JAVA_HOME`, `ANDROID_HOME` and `NDK_HOME` environment variables, and the Rust Android targets.
- **iOS (macOS only):** full Xcode, the Rust iOS targets and CocoaPods.
### 6. Clone and install
 
```sh
git clone <repository-url> praxis
cd praxis
pnpm install
```
 
### 7. Verify the setup
 
From the repository root, run the full pipeline:
 
```sh
pnpm install && pnpm exec turbo run build check-types lint
```
 
If it finishes without errors, your environment is ready.
 
### 8. Run the app
 
```sh
# Web frontend only
pnpm dev
 
# Desktop app with Tauri
pnpm tauri dev
```
 
> `pnpm tauri ...` is a root script that forwards to the `native` app (`pnpm --filter native tauri`). Mobile commands follow the same pattern, e.g. `pnpm tauri android dev`.
 
### Troubleshooting
 
- **Command not found after installing Node or Rust:** restart your terminal (sometimes your machine) so the new `PATH` is picked up.
- **Linker or WebKit errors on Linux:** re-check the packages for your distribution in the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/#linux).
- **Anything else Tauri-related:** see the [Tauri debugging guide](https://v2.tauri.app/develop/debug/).
<details>
<summary><strong>For maintainers: how the monorepo was bootstrapped</strong></summary>

```sh
# 1. Create the Turborepo with pnpm
pnpm dlx create-turbo@latest
 
# 2. Create the Tauri app inside apps/ (name it "native")
cd apps
pnpm create tauri-app
 
# 3. Back at the root, install workspace dependencies
cd .. && pnpm install
```
 
Then wire the workspace together:
 
- Add a `clean` task (`"cache": false`) to `turbo.json`.
- Add root scripts: `"clean": "turbo run clean"`, `"check-types": "turbo check-types"` and `"tauri": "pnpm --filter native tauri"`.
- Add `"clean"` and `"check-types"` scripts to `apps/native/package.json`.
- Make `apps/native/tsconfig.json` extend the shared config from `packages/`.
- Move `apps/native/.vscode/extensions.json` to the repository root.
Reference: [Tauri v2 monorepo guide](https://melvinoostendorp.nl/blog/tauri-v2-nextjs-monorepo-guide) (Jan 2025; written for Next.js, adapted here for SvelteKit).
 
</details>

---

## Documentation
 
- [`docs/adr/`](docs/adr/): why the architecture is the way it is (Architecture Decision Records).
- [Tauri v2 docs](https://v2.tauri.app/start/prerequisites/): prerequisites and platform setup (last updated Aug 20, 2026).
- [Turborepo docs](https://turborepo.dev/docs/getting-started/installation): installation and running tasks.

---

_Happy Learning!_
