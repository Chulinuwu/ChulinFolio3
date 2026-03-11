<script lang="ts">
    const technologies = [
        { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Svelte", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg" },
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
        { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
        { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
        { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg" },
        { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
        { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
        { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg" },
        { name: "Angular", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg" },
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" }
    ];

    let {
        speed = 25,
        gap = 24,
        opacity = 0.5,
        hoverOpacity = 1,
        itemWidth = 140,
        itemHeight = 56
    } = $props<{
        speed?: number;
        gap?: number;
        opacity?: number;
        hoverOpacity?: number;
        itemWidth?: number;
        itemHeight?: number;
    }>();
</script>

<section class="infinite-scroll-container fade-mask">
    <ul
        class="tech-list scroll-animation"
        style="gap: {gap}px; animation-duration: {speed}s;"
    >
        {#each technologies as tech}
            <li
                class="tech-item"
                style="width: {itemWidth}px; height: {itemHeight}px; opacity: {opacity}; --hover-opacity: {hoverOpacity};"
            >
                <div class="tech-content">
                    <img src={tech.logo} alt={tech.name} class="tech-logo" loading="lazy" />
                    <span class="tech-name">{tech.name}</span>
                </div>
            </li>
        {/each}

        {#each technologies as tech}
            <li
                class="tech-item"
                aria-hidden="true"
                style="width: {itemWidth}px; height: {itemHeight}px; opacity: {opacity}; --hover-opacity: {hoverOpacity};"
            >
                <div class="tech-content">
                    <img src={tech.logo} alt={tech.name} class="tech-logo" loading="lazy" />
                    <span class="tech-name">{tech.name}</span>
                </div>
            </li>
        {/each}
    </ul>
</section>

<style>
    @keyframes scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }

    @keyframes scroll-right {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
    }

    .scroll-animation { animation: scroll-left 20s linear infinite; }
    .scroll-animation-right { animation: scroll-left 25s linear infinite; }
    .scroll-animation-left { animation: scroll-right 25s linear infinite; }

    .scroll-animation:hover,
    .scroll-animation-right:hover,
    .scroll-animation-left:hover {
        animation-play-state: paused;
    }

    .fade-mask {
        mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%);
        -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgb(0,0,0) 12.5%, rgb(0,0,0) 87.5%, rgba(0,0,0,0) 100%);
    }

    .infinite-scroll-container {
        display: flex;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        place-items: center;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .tech-list {
        display: flex;
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        place-items: flex-start;
        margin: 0;
        padding-top: 20px;
        padding-bottom: 20px;
        list-style-type: none;
        position: relative;
        flex-direction: row;
        will-change: transform;
        animation: scroll-left linear infinite;
    }

    .tech-item {
        flex-shrink: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        cursor: pointer;
    }

    .tech-item:hover {
        opacity: var(--hover-opacity) !important;
        transform: translateY(-2px);
    }

    .tech-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(4px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 8px;
        transition: all 0.3s ease;
        min-height: 60px;
    }

    .tech-content:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        transform: scale(1.02);
    }

    .tech-logo {
        width: 24px;
        height: 24px;
        object-fit: contain;
        filter: brightness(0.9);
        transition: filter 0.3s ease;
        flex-shrink: 0;
        margin-bottom: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
    }

    .tech-content:hover .tech-logo {
        filter: brightness(1.1);
    }

    .tech-name {
        font-size: 11px;
        font-weight: 600;
        color: #ffffff;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        line-height: 1.3;
        letter-spacing: 0.025em;
        display: block;
        margin-top: 2px;
    }

    @media (max-width: 768px) {
        .tech-logo { width: 20px; height: 20px; }
        .tech-name { font-size: 10px; }
        .tech-content { padding: 6px; min-height: 48px; }
    }

    @media (max-width: 480px) {
        .tech-logo { width: 18px; height: 18px; }
        .tech-name { font-size: 9px; }
        .tech-content { padding: 4px; min-height: 44px; }
    }

    @media (prefers-reduced-motion: reduce) {
        .tech-list { animation: none; }
        .tech-item:hover { transform: none; }
        .tech-content:hover { transform: none; }
    }

    @media (prefers-contrast: high) {
        .tech-content { background: rgba(255, 255, 255, 0.15); border-color: rgba(255, 255, 255, 0.3); }
        .tech-content:hover { background: rgba(255, 255, 255, 0.25); border-color: rgba(255, 255, 255, 0.5); }
    }

    @media (prefers-color-scheme: dark) {
        .tech-logo { filter: brightness(0.9) invert(0); }
        .tech-content:hover .tech-logo { filter: brightness(1.1) invert(0); }
    }

    .tech-item:focus-within .tech-content {
        outline: 2px solid #4ade80;
        outline-offset: 2px;
    }
</style>
