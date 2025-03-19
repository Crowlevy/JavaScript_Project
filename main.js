// No import statements

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Access libraries from the window object
    const hljs = window.hljs || {};
    const gsap = window.gsap || {};

    initializeApp();

    function initializeApp() {
        setupNavigation();
        setupVariablePlayground();
        setupTypeChecker();
        setupSyntaxHighlighting();
        animateIntroElements();
        setupResponsiveMenu();
        setupOperatorsExample();
        setupFunctionExamples();
        setupDOMExamples();
        setupAsyncExample();
        initTooltips();
        setupCodeCopyButtons();
        trackProgress();
        setupDarkModeToggle();
        setupAccordions();
        setupEventLoopAnimation();
        setupMarketChart();
        setupProjectDemo();
        setupScrollAnimation();
        setupInteractiveElements();
    }

    function setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        // Highlight active section on scroll
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;

            document.querySelectorAll('section').forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        // Smooth scroll for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                window.scrollTo({
                    top: targetSection.offsetTop - 20,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                /*if (window.innerWidth < 1024) {
                    const sidebar = document.getElementById('sidebar');
                    sidebar.classList.add('mobile-hidden');
                    document.querySelector('main').classList.add('sidebar-hidden');
                }
                */
                const toggleButton = document.getElementById('menuToggle');

                if (toggleButton) {
                    toggleButton.addEventListener('click', function () {
                        document.querySelector('main').classList.add('sidebar-hidden');
                    });
                }
            });
        });
    }

    function setupVariablePlayground() {
        const codeTextarea = document.getElementById('variableCode');
        const resultOutput = document.getElementById('variableResult');
        const runButton = document.getElementById('runVariableCode');

        if (!codeTextarea || !resultOutput || !runButton) return;

        runButton.addEventListener('click', () => {
            const code = codeTextarea.value;
            resultOutput.innerHTML = '';

            try {
                // Create a safe evaluation environment
                const originalConsoleLog = console.log;
                let output = '';

                // Override console.log to capture output
                console.log = (...args) => {
                    output += args.map(arg =>
                        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' ') + '\n';
                    originalConsoleLog(...args);
                };

                // Execute the code
                new Function(code)();

                // Restore original console.log
                console.log = originalConsoleLog;

                resultOutput.textContent = output || 'Código executado sem saída do console.';
            } catch (error) {
                resultOutput.textContent = `Erro: ${error.message}`;
                resultOutput.classList.add('text-red-600');
            }
        });
    }

    function setupTypeChecker() {
        const typeCheckTextarea = document.getElementById('typeCheckCode');
        const typeCheckResult = document.getElementById('typeCheckResult');
        const checkButton = document.getElementById('runTypeCheck');

        if (!typeCheckTextarea || !typeCheckResult || !checkButton) return;

        checkButton.addEventListener('click', () => {
            const code = typeCheckTextarea.value;
            typeCheckResult.innerHTML = '';

            try {
                // Create a safe evaluation environment
                const originalConsoleLog = console.log;
                let output = '';

                // Override console.log to capture output
                console.log = (...args) => {
                    output += args.map(arg =>
                        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' ') + '\n';
                    originalConsoleLog(...args);
                };

                // Execute the code
                new Function(code)();

                // Restore original console.log
                console.log = originalConsoleLog;

                typeCheckResult.textContent = output || 'Código executado sem saída do console.';
            } catch (error) {
                typeCheckResult.textContent = `Erro: ${error.message}`;
                typeCheckResult.classList.add('text-red-600');
            }
        });
    }

    function setupSyntaxHighlighting() {
        // Apply syntax highlighting to all code blocks
        if (hljs && hljs.highlightAll) {
            hljs.highlightAll();
        } else {
            document.querySelectorAll('pre code').forEach(block => {
                if (hljs && hljs.highlightElement) {
                    hljs.highlightElement(block);
                }
            });
        }
    }

    function animateIntroElements() {
        if (!gsap) return;

        // Set elements to their final state immediately without animations
        gsap.set('#intro h2', { opacity: 1, y: 0 });
        gsap.set('#intro p', { opacity: 1, y: 0 });
        gsap.set('#intro button', { opacity: 1, y: 0 });
        gsap.set('.grid > div', { opacity: 1, y: 0 });
    }

    function setupResponsiveMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('main');

        if (!menuToggle || !sidebar || !mainContent) return;

        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-hidden');
            mainContent.classList.toggle('sidebar-hidden');
        });

        // Initialize mobile view
        if (window.innerWidth < 1024) {
            sidebar.classList.add('mobile-hidden');
            mainContent.classList.add('sidebar-hidden');
        }

        // Update on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                sidebar.classList.remove('mobile-hidden');
                mainContent.classList.remove('sidebar-hidden');
            } else {
                if (!sidebar.classList.contains('mobile-hidden')) {
                    sidebar.classList.add('mobile-hidden');
                    mainContent.classList.add('sidebar-hidden');
                }
            }
        });
    }

    function setupOperatorsExample() {
        const operatorForm = document.getElementById('operatorForm');
        const operatorResult = document.getElementById('operatorResult');

        if (!operatorForm || !operatorResult) return;

        operatorForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const num1 = parseFloat(document.getElementById('num1').value);
            const num2 = parseFloat(document.getElementById('num2').value);
            const operator = document.getElementById('operator').value;

            let result;
            switch (operator) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': result = num1 / num2; break;
                case '%': result = num1 % num2; break;
                case '**': result = num1 ** num2; break;
                default: result = "Operador não reconhecido";
            }

            // Enhanced visual feedback
            operatorResult.innerHTML = `
                <div class="animate-fade-in">
                    <p class="text-xl font-semibold">${num1} ${operator} ${num2} = <span class="text-indigo-600">${result}</span></p>
                    <div class="mt-2 bg-indigo-50 p-3 rounded-md">
                        <p class="text-sm text-gray-700">Expressão avaliada: <code>${num1} ${operator} ${num2}</code></p>
                        <div class="mt-2 progress-bar-container h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div class="progress-bar" style="width: 0%"></div>
                        </div>
                    </div>
                </div>
            `;

            // Animate progress bar
            const progressBar = operatorResult.querySelector('.progress-bar');
            gsap.fromTo(progressBar,
                { width: '0%' },
                { width: '100%', duration: 0.8, ease: 'power2.out' }
            );

            gsap.from(operatorResult.querySelector('div'), {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: 'back.out'
            });
        });
    }

    function setupFunctionExamples() {
        const functionDemo = document.getElementById('functionDemo');
        const functionResult = document.getElementById('functionResult');
        const functionType = document.getElementById('functionType');

        if (!functionDemo || !functionResult || !functionType) return;

        functionDemo.addEventListener('click', function () {
            const type = functionType.value;
            functionResult.innerHTML = '';

            functionResult.innerHTML = `
                <div class="flex justify-center py-4">
                    <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
            `;

            setTimeout(() => {
                let code, result, visualization;

                if (type === 'regular') {
                    code = `function saudar(nome) {
  return "Olá, " + nome + "!";
}`;
                    result = `saudar("Usuário") => "Olá, Usuário!"`;
                    visualization = `
                    <div class="bg-indigo-50 p-3 rounded-md mt-3">
                        <div class="flex items-center justify-center">
                            <div class="p-2 bg-white rounded shadow mr-4">
                                <span class="text-xs font-mono">nome = "Usuário"</span>
                            </div>
                            <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                            <div class="p-2 bg-green-100 rounded shadow ml-4">
                                <span class="text-xs font-mono">"Olá, Usuário!"</span>
                            </div>
                        </div>
                    </div>`;
                } else if (type === 'arrow') {
                    code = `const saudar = (nome) => {
  return \`Olá, \${nome}!\`;
}`;
                    result = `saudar("Usuário") => "Olá, Usuário!"`;
                    visualization = `
                    <div class="bg-indigo-50 p-3 rounded-md mt-3">
                        <div class="flex items-center justify-center">
                            <div class="p-2 bg-white rounded shadow mr-4">
                                <span class="text-xs font-mono">nome = "Usuário"</span>
                            </div>
                            <svg class="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                            <div class="p-2 bg-green-100 rounded shadow ml-4">
                                <span class="text-xs font-mono">"Olá, Usuário!"</span>
                            </div>
                        </div>
                    </div>`;
                } else if (type === 'callback') {
                    code = `function processar(item, callback) {
  return callback(item);
}

processar(5, (x) => x * x);`;
                    result = `processar(5, (x) => x * x) => 25`;
                    visualization = `
                    <div class="bg-indigo-50 p-3 rounded-md mt-3">
                        <div class="flex flex-col items-center">
                            <div class="flex items-center mb-2">
                                <div class="p-2 bg-white rounded shadow mr-4">
                                    <span class="text-xs font-mono">item = 5</span>
                                </div>
                                <div class="p-2 bg-purple-100 rounded shadow">
                                    <span class="text-xs font-mono">callback = (x) => x * x</span>
                                </div>
                            </div>
                            <svg class="w-6 h-6 text-indigo-500 my-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                            </svg>
                            <div class="p-2 bg-green-100 rounded shadow">
                                <span class="text-xs font-mono">return callback(5) => 25</span>
                            </div>
                        </div>
                    </div>`;
                }

                functionResult.innerHTML = `
                    <div class="bg-gray-800 text-white p-4 rounded-md mb-4 overflow-x-auto code-animation">
                        <pre><code class="language-javascript">${code}</code></pre>
                    </div>
                    <div class="bg-green-50 border-l-4 border-green-500 p-4 code-animation" style="animation-delay: 0.2s">
                        <p class="font-mono">${result}</p>
                    </div>
                    ${visualization}
                    <div class="mt-4 code-animation" style="animation-delay: 0.4s">
                        <button class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded text-sm mr-2 tryCode pulse-animation">Testar</button>
                        <button class="px-3 py-1 bg-green-100 text-green-700 rounded text-sm copyCode">Copiar</button>
                    </div>
                `;

                functionResult.querySelectorAll('pre code').forEach(block => {
                    if (hljs && hljs.highlightElement) {
                        hljs.highlightElement(block);
                    }
                });

                gsap.from(functionResult.children, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: 'back.out'
                });

                functionResult.querySelector('.tryCode').addEventListener('click', () => {
                    let output = '';
                    if (type === 'regular') {
                        output = 'saudar("Usuário") executado! Saída: "Olá, Usuário!"';
                    } else if (type === 'arrow') {
                        output = 'saudar("Usuário") executado! Saída: "Olá, Usuário!"';
                    } else if (type === 'callback') {
                        output = 'processar(5, (x) => x * x) executado! Saída: 25';
                    }

                    const toast = document.createElement('div');
                    toast.className = 'fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded shadow-lg z-50';
                    toast.textContent = output;
                    document.body.appendChild(toast);

                    setTimeout(() => {
                        toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
                        setTimeout(() => toast.remove(), 500);
                    }, 3000);
                });

                functionResult.querySelector('.copyCode').addEventListener('click', () => {
                    navigator.clipboard.writeText(code);

                    const copyBtn = functionResult.querySelector('.copyCode');
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copiado!';
                    copyBtn.classList.remove('bg-green-100', 'text-green-700');
                    copyBtn.classList.add('bg-green-500', 'text-white');

                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                        copyBtn.classList.remove('bg-green-500', 'text-white');
                        copyBtn.classList.add('bg-green-100', 'text-green-700');
                    }, 2000);
                });
            }, 800);
        });
    }

    function setupDOMExamples() {
        const domControlForm = document.getElementById('domControlForm');
        const demoElement = document.getElementById('demoElement');

        if (!domControlForm || !demoElement) return;

        gsap.to(demoElement, {
            y: [0, -10, 0],
            duration: 1.5,
            ease: "elastic.out(1, 0.3)",
            onComplete: () => {
                gsap.to(demoElement, {
                    boxShadow: "0 0 0 2px rgba(79, 70, 229, 0.4)",
                    duration: 0.3,
                    repeat: 2,
                    yoyo: true
                });
            }
        });

        domControlForm.addEventListener('change', function () {
            demoElement.style = '';
            demoElement.className = 'p-4 border rounded transition-all duration-300';

            const textColor = document.getElementById('textColor').value;
            const bgColor = document.getElementById('bgColor').value;
            const fontSize = document.getElementById('fontSize').value;
            const borderRadius = document.getElementById('borderRadius').value;

            if (textColor) demoElement.style.color = textColor;
            if (bgColor) demoElement.style.backgroundColor = bgColor;
            if (fontSize) demoElement.style.fontSize = `${fontSize}px`;
            if (borderRadius) demoElement.style.borderRadius = `${borderRadius}px`;

            const domCode = document.getElementById('domCode');
            domCode.textContent =
                `// JavaScript para manipular o elemento
const elemento = document.getElementById('demoElement');
elemento.style.color = '${textColor || 'initial'}';
elemento.style.backgroundColor = '${bgColor || 'initial'}';
elemento.style.fontSize = '${fontSize ? fontSize + 'px' : 'initial'}';
elemento.style.borderRadius = '${borderRadius ? borderRadius + 'px' : 'initial'}';`;

            gsap.from(demoElement, {
                scale: 0.95,
                opacity: 0.7,
                duration: 0.3,
                ease: "power2.out"
            });

            if (hljs && hljs.highlightElement) {
                hljs.highlightElement(domCode);
            }
        });
    }

    function setupAsyncExample() {
        const fetchButton = document.getElementById('fetchDataBtn');
        const userContainer = document.getElementById('userData');
        const loadingIndicator = document.getElementById('loadingIndicator');

        if (!fetchButton || !userContainer || !loadingIndicator) return;

        fetchButton.addEventListener('click', async function () {
            try {
                userContainer.innerHTML = '';
                loadingIndicator.classList.remove('hidden');

                await new Promise(resolve => setTimeout(resolve, 1500));

                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) throw new Error('Falha ao buscar dados.');

                const users = await response.json();

                loadingIndicator.classList.add('hidden');

                userContainer.innerHTML = users.slice(0, 4).map(user => `
                    <div class="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                        <h4 class="text-lg font-semibold text-indigo-700">${user.name}</h4>
                        <p class="text-gray-500">${user.email}</p>
                        <div class="mt-2 pt-2 border-t">
                            <p class="text-sm"><span class="font-medium">Telefone:</span> ${user.phone}</p>
                            <p class="text-sm"><span class="font-medium">Website:</span> ${user.website}</p>
                        </div>
                    </div>
                `).join('');

            } catch (error) {
                loadingIndicator.classList.add('hidden');
                userContainer.innerHTML = `
                    <div class="bg-red-50 p-4 rounded border-l-4 border-red-500">
                        <p class="text-red-700">Erro: ${error.message}</p>
                    </div>
                `;
            }
        });
    }

    function initTooltips() {
        const tooltips = document.querySelectorAll('[data-tooltip]');

        tooltips.forEach(tooltip => {
            const tooltipText = tooltip.getAttribute('data-tooltip');

            tooltip.addEventListener('mouseenter', function (e) {
                const tip = document.createElement('div');
                tip.className = 'absolute z-50 bg-gray-800 text-white text-sm px-2 py-1 rounded pointer-events-none';
                tip.style.bottom = '100%';
                tip.style.left = '50%';
                tip.style.transform = 'translateX(-50%) translateY(-5px)';
                tip.style.whiteSpace = 'nowrap';
                tip.textContent = tooltipText;

                tooltip.appendChild(tip);

                gsap.fromTo(tip,
                    { opacity: 0, y: -3 },
                    { opacity: 1, y: 0, duration: 0.2 }
                );
            });

            tooltip.addEventListener('mouseleave', function () {
                const tip = tooltip.querySelector('div');
                if (tip) {
                    gsap.to(tip, {
                        opacity: 0,
                        y: -3,
                        duration: 0.2,
                        onComplete: () => tip.remove()
                    });
                }
            });
        });
    }

    function setupCodeCopyButtons() {
        document.querySelectorAll('.code-container').forEach(container => {
            const codeBlock = container.querySelector('pre');
            if (!codeBlock) return;

            const copyButton = document.createElement('button');
            copyButton.className = 'absolute top-2 right-2 bg-gray-700 text-white p-1 rounded opacity-70 hover:opacity-100 transition';
            copyButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            `;

            copyButton.addEventListener('click', () => {
                const code = codeBlock.textContent;
                navigator.clipboard.writeText(code);

                copyButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                `;

                setTimeout(() => {
                    copyButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    `;
                }, 2000);
            });

            container.style.position = 'relative';
            container.appendChild(copyButton);
        });
    }

    function trackProgress() {
        const sections = document.querySelectorAll('section[id]');
        const totalSections = sections.length;
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');

        if (!progressBar || !progressText) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute('data-visited', 'true');

                    const visitedSections = document.querySelectorAll('section[data-visited="true"]').length;
                    const progress = Math.round((visitedSections / totalSections) * 100);

                    progressBar.style.width = `${progress}%`;
                    progressText.textContent = `${progress}% Completo`;
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => observer.observe(section));
    }

    /*function setupDarkModeToggle() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        const html = document.documentElement;

        if (!darkModeToggle) return;

        const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

        if (isDarkMode) {
            html.classList.add('dark-mode');
            darkModeToggle.checked = true;
        }

        darkModeToggle.addEventListener('change', function () {
            if (this.checked) {
                html.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                html.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
            }
        });
    }*/

    function setupAccordions() {
        const accordionButtons = document.querySelectorAll('.accordion-button');

        accordionButtons.forEach(button => {
            button.addEventListener('click', function () {
                const content = this.nextElementSibling;
                const icon = this.querySelector('svg');

                this.classList.toggle('active');

                if (content.style.maxHeight) {
                    gsap.to(content, {
                        maxHeight: 0,
                        duration: 0.3,
                        ease: "power1.out",
                        onComplete: () => {
                            content.style.maxHeight = null;
                        }
                    });
                    gsap.to(icon, {
                        rotation: 0,
                        duration: 0.3,
                        ease: "power1.out"
                    });
                } else {
                    content.style.maxHeight = "0px";
                    gsap.to(content, {
                        maxHeight: content.scrollHeight + "px",
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    gsap.to(icon, {
                        rotation: 180,
                        duration: 0.3,
                        ease: "power1.out"
                    });
                }
            });
        });

        if (accordionButtons.length > 0) {
            setTimeout(() => {
                accordionButtons[0].click();
            }, 500);
        }
    }

    function setupEventLoopAnimation() {
        const animButton = document.getElementById('runEventLoop');
        const loopCircle = document.getElementById('eventLoopCircle');
        const callStack = document.getElementById('callStackBlock');
        const callbackQueue = document.getElementById('callbackQueueBlock');

        if (!animButton || !loopCircle || !callStack || !callbackQueue) return;

        animButton.addEventListener('click', function () {
            animButton.disabled = true;

            const timeline = gsap.timeline({
                onComplete: () => {
                    animButton.disabled = false;
                }
            });

            timeline
                .to(callbackQueue, { duration: 0.5, scale: 1.1, backgroundColor: '#10B981', ease: 'power1.out' })
                .to(loopCircle, { duration: 1, rotation: 360, repeat: 1, ease: 'none' })
                .to(callbackQueue, { duration: 0.5, scale: 1, backgroundColor: '#DEF7EC', ease: 'power1.in' })
                .to(loopCircle, { duration: 0.5, x: 0, y: -50, ease: 'power2.out' })
                .to(callStack, { duration: 0.5, scale: 1.1, backgroundColor: '#FCD34D', ease: 'power1.out' }, '-=0.3')
                .to(loopCircle, { duration: 0.5, x: 0, y: 0, ease: 'power2.in' })
                .to(callStack, { duration: 0.5, scale: 1, backgroundColor: '#FEF3C7', ease: 'power1.in' });
        });
    }

    function setupMarketChart() {
        const chartContainer = document.getElementById('marketChart');

        if (!chartContainer) return;

        // Use Chart from window object instead of importing
        if (window.Chart) {
            const canvas = document.createElement('canvas');
            chartContainer.appendChild(canvas);

            new window.Chart(canvas, {
                type: 'bar',
                data: {
                    labels: ['Frontend', 'Backend', 'Mobile', 'Full Stack', 'DevOps'],
                    datasets: [{
                        label: 'Demanda de Mercado (Vagas por mês)',
                        data: [1500, 1200, 800, 1800, 600],
                        backgroundColor: [
                            'rgba(99, 102, 241, 0.8)',
                            'rgba(79, 70, 229, 0.8)',
                            'rgba(124, 58, 237, 0.8)',
                            'rgba(139, 92, 246, 0.8)',
                            'rgba(167, 139, 250, 0.8)'
                        ],
                        borderColor: [
                            'rgb(99, 102, 241)',
                            'rgb(79, 70, 229)',
                            'rgb(124, 58, 237)',
                            'rgb(139, 92, 246)',
                            'rgb(167, 139, 250)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return `Vagas: ${context.raw}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        } else {
            chartContainer.innerHTML = '<p class="text-center text-red-500">Falha ao carregar o gráfico</p>';
        }
    }

    function setupProjectDemo() {
        const demoForm = document.getElementById('project-demo-form');

        if (!demoForm) return;

        demoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = demoForm.querySelector('input');

            if (input && input.value.trim()) {
                const notification = document.createElement('div');
                notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg';
                notification.textContent = 'Em um projeto real, essa tarefa seria adicionada à lista!';
                document.body.appendChild(notification);

                input.value = '';

                setTimeout(() => {
                    notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
                    setTimeout(() => notification.remove(), 500);
                }, 3000);
            }
        });
    }

    function setupScrollAnimation() {
        const sections = document.querySelectorAll('section');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;
                    const title = section.querySelector('h2');
                    const content = Array.from(section.children).filter(el => el !== title);

                    // Immediately make content visible without animations
                    if (title) {
                        gsap.set(title, { opacity: 1, y: 0 });
                    }

                    gsap.set(content, { opacity: 1, y: 0 });

                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.15 });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    function setupInteractiveElements() {
        // Make section cards interactive
        document.querySelectorAll('.section-card').forEach(card => {
            card.addEventListener('mouseenter', function () {
                gsap.to(this, {
                    y: -5,
                    boxShadow: '0 10px 25px rgba(79, 70, 229, 0.15)',
                    duration: 0.3
                });
            });

            card.addEventListener('mouseleave', function () {
                gsap.to(this, {
                    y: 0,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                    duration: 0.3
                });
            });
        });

        // Add visual cues to interactive elements
        document.querySelectorAll('.interactive-playground').forEach(playground => {
            const indicator = document.createElement('div');
            indicator.className = 'absolute top-2 right-2 text-xs text-indigo-500 font-semibold';
            indicator.innerHTML = `
                <svg class="inline w-4 h-4 mr-1 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                </svg>
                Interativo
            `;
            playground.appendChild(indicator);
        });

        // Auto-run first interactive examples after page load
        setTimeout(() => {
            const firstRunButton = document.getElementById('runVariableCode');
            if (firstRunButton) {
                firstRunButton.click();
            }

            const functionDemoButton = document.getElementById('functionDemo');
            if (functionDemoButton) {
                functionDemoButton.click();
            }
        }, 1500);
    }
});