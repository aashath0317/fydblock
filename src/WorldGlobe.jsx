import React, { useEffect, useRef } from 'react';

const WorldGlobe = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let rotation = 0;

        // Configuration
        const DOT_COUNT = 300;
        const DOT_SIZE = 2;

        // Resize handler
        const resizeCanvas = () => {
            // Set canvas size to match parent container
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth;
                canvas.height = parent.offsetHeight;
            }
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Generate random points on UNIT sphere (radius 1)
        const points = [];
        for (let i = 0; i < DOT_COUNT; i++) {
            const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
            const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

            points.push({
                x: Math.cos(theta) * Math.sin(phi),
                y: Math.sin(theta) * Math.sin(phi),
                z: Math.cos(phi)
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Dynamic Radius: 40% of the smallest screen dimension
            const globeRadius = Math.min(canvas.width, canvas.height) * 0.4;
            const connectionDist = globeRadius * 0.3; // Distance to draw lines

            rotation += 0.003; // Rotation speed

            // Rotate and project points
            const projectedPoints = points.map(p => {
                // Scale unit sphere to globe radius
                const pX = p.x * globeRadius;
                const pY = p.y * globeRadius;
                const pZ = p.z * globeRadius;

                // Rotate around Y axis
                const x = pX * Math.cos(rotation) - pZ * Math.sin(rotation);
                const z = pX * Math.sin(rotation) + pZ * Math.cos(rotation);
                const y = pY;

                // Perspective scale
                const scale = 800 / (800 - z);
                const alpha = (z + globeRadius) / (2 * globeRadius); // Fade back points

                return {
                    x: x * scale + centerX,
                    y: y * scale + centerY,
                    z: z,
                    alpha: Math.max(0.1, alpha)
                };
            });

            // Draw connections
            ctx.strokeStyle = '#00FF9D';
            projectedPoints.forEach((p1, i) => {
                if (p1.z < -100) return; // Don't draw connections on back side too much

                // Find close points to connect
                for (let j = i + 1; j < projectedPoints.length; j++) {
                    const p2 = projectedPoints[j];
                    if (p2.z < -100) continue;

                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDist) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.globalAlpha = (1 - dist / connectionDist) * 0.3 * p1.alpha;
                        ctx.stroke();
                    }
                }
            });

            // Draw points
            projectedPoints.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, DOT_SIZE, 0, Math.PI * 2);
                ctx.fillStyle = '#00FF9D';
                ctx.globalAlpha = p.alpha;
                ctx.fill();

                // Add glow to front points
                if (p.z > 100) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#00FF9D';
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default WorldGlobe;