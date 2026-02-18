import { useState, useEffect, useRef } from "react";
// @ts-ignore
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export const VantaSection = () => {
    const [vantaEffect, setVantaEffect] = useState<any>(null);
    const myRef = useRef(null);

    useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(
                NET({
                    el: myRef.current,
                    THREE: THREE,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.0,
                    minWidth: 200.0,
                    scale: 1.0,
                    scaleMobile: 1.0,
                    color: 0x0f172a, // Dark background base
                    backgroundColor: 0x020617, // Very dark blue/slate
                    pointsColor: 0x14b8a6, // Teal
                    maxDistance: 22.0,
                    spacing: 16.0,
                })
            );
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    return (
        <section ref={myRef} className="relative min-h-[600px] h-[80vh] w-full overflow-hidden flex items-center justify-center py-10">
            {/* Content Overlay */}
            <div className="container relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center pointer-events-none">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-left pointer-events-auto"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 backdrop-blur-md rounded-full border border-violet-500/30 mb-6">
                        <Zap className="w-4 h-4 text-white md:text-violet-400" />
                        <span className="text-white md:text-violet-400 font-semibold text-sm uppercase tracking-wider">Next Gen Technology</span>
                    </div>

                    <h2 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 text-white leading-tight">
                        Experience the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-white">
                            Drive of Tomorrow
                        </span>
                    </h2>

                    <p className="text-lg text-white md:text-slate-300 mb-8 max-w-xl leading-relaxed drop-shadow-md">
                        Witness the convergence of sustainable energy and cutting-edge automotive engineering.
                        The future isn't just arriving—it's already here.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white border-0 shadow-lg shadow-teal-500/25 group">
                            Explore Exhibits <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>

                    </div>
                </motion.div>

                {/* EV Image */}
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative pointer-events-none"
                >
                    {/* Glowing orb behind car */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[100px]" />

                    <img
                        src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"
                        alt="Futuristic EV"
                        className="relative z-10 w-full lg:w-[120%] max-w-full lg:max-w-none transform lg:-translate-x-20 drop-shadow-2xl opacity-90 rounded-2xl border border-white/10"
                    // Note: Using a placeholder Unsplash image. Ideally, use a transparent PNG.
                    // Since we can't generate the specific transparent one, we style this one to look integrated.
                    />
                </motion.div>
            </div>

            {/* Overlay Gradient for smooth blending */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
        </section>
    );
};
