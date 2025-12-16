// "use client";
// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// const items = [
//     {
//         "src": "https://res.cloudinary.com/dkornixrz/image/upload/v1761937298/products/laxabeftsjg9qbpo2toq.png",
//         "alt": "Charcoal Face Wash",
//         "title": "Redefine Your Grooming",
//         "desc": "Men's care redefined",
//         "position": { "x": "-38vw", "y": "-25vh" },
//         "mobilePosition": { "x": "-30vw", "y": "-13vh" },
//         "descPosition": "top-10 left-1/2 -translate-x-1/2 text-center md:top-12"
//     },
//     {
//         "src": "https://res.cloudinary.com/dkornixrz/image/upload/v1761937298/products/laxabeftsjg9qbpo2toq.png",
//         "alt": "Hydrating Beard Oil",
//         "title": "Stay Effortlessly Stylish",
//         "desc": "For the stylish man",
//         "position": { "x": "38vw", "y": "-25vh" },
//         "mobilePosition": { "x": "30vw", "y": "-13vh" },
//         "descPosition": "top-1/2 right-3 -translate-y-1/2 text-right md:right-12"
//     },
//     {
//        "src": "https://res.cloudinary.com/dkornixrz/image/upload/v1761937298/products/laxabeftsjg9qbpo2toq.png",
//          "alt": "SPF 50 Moisturizer",
//         "title": "Routine Elevated",
//         "desc": "Elevate your routine",
//         "position": { "x": "-38vw", "y": "28vh" },
//         "mobilePosition": { "x": "-30vw", "y": "13vh" },
//         "descPosition": "top-1/2 left-3 -translate-y-1/2 text-left md:left-12"
//     },
//     {
//        "src": "https://res.cloudinary.com/dkornixrz/image/upload/v1761937298/products/laxabeftsjg9qbpo2toq.png",
//          "alt": "Matte Hair Clay",
//         "title": "Built for Bold Confidence",
//         "desc": "Confidence for men",
//         "position": { "x": "38vw", "y": "28vh" },
//         "mobilePosition": { "x": "30vw", "y": "13vh" },
//         "descPosition": "bottom-10 left-1/2 -translate-x-1/2 text-center md:bottom-12"
//     }
// ]



// export default function BeautyBoxVisibleDescriptions() {
//     const containerRef = useRef(null);
//     const imgRefs = useRef(items.map(() => React.createRef()));
//     const descRefs = useRef(items.map(() => React.createRef()));
//     const boxClosedRef = useRef();
//     const boxOpenRef = useRef();

//     useEffect(() => {
//         const mm = gsap.matchMedia();

//         gsap.set(boxClosedRef.current, { scale: 0.7, opacity: 0, zIndex: 10, transformOrigin: "bottom center" });
//         gsap.set(boxOpenRef.current, { scale: 0.75, opacity: 1, zIndex: 5, transformOrigin: "bottom center" });


//         imgRefs.current.forEach((ref) => {
//             gsap.set(ref.current, {
//                 scale: 0.6,
//                 opacity: 0,
//                 rotationX: 0,
//                 rotationY: 0,
//                 //  boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
//                 transformOrigin: "center center",
//             });
//         });

//         descRefs.current.forEach((ref) => {
//             gsap.set(ref.current, { opacity: 0, y: 20, scale: 0.85 });
//         });

//         mm.add(
//             {
//                 isMobile: "(max-width: 767px)",
//                 isDesktop: "(min-width: 768px)",
//             },
//             (context) => {
//                 const { isMobile, isDesktop } = context.conditions;

//                 const timeline = gsap.timeline({ defaults: { duration: 0.6, ease: "power3.out" }, repeat: -1, yoyo: true });

//                 // Animate box open/closed toggle
//                 timeline.to(boxOpenRef.current, { scale: isMobile ? 1.05 : 1, opacity: 1 });
//                 timeline.to(boxClosedRef.current, { scale: isMobile ? 1.15 : 1.1, opacity: 0 }, "<");
//                 timeline.to(boxOpenRef.current, { opacity: 0, duration: 0.4 }, "+=1");
//                 timeline.to(boxClosedRef.current, { opacity: 1, duration: 0.4, scale: isMobile ? 1.2 : 1.15 }, "<");

//                 // Animate product items with staggered entrance
//                 items.forEach((item, i) => {
//                     const pos = isMobile ? item.mobilePosition : item.position;

//                     timeline.to(
//                         imgRefs.current[i].current,
//                         {
//                             x: pos.x,
//                             y: pos.y,
//                             scale: isMobile ? 1 : 1.15,
//                             rotationX: 0,
//                             rotationY: 0,
//                             opacity: 1,
//                             duration: 0.8,
//                             ease: "elastic.out(1, 0.6)",
//                         },
//                         "-=0.4"
//                     );

//                     timeline.to(
//                         descRefs.current[i].current,
//                         {
//                             opacity: 1,
//                             y: 0,
//                             scale: 1,
//                             duration: 0.5,
//                             ease: "back.out(1.7)",
//                         },
//                         "<"
//                     );

//                     // Interactive hover/tap tilt and scale animation
//                     const el = imgRefs.current[i].current;
//                     el.addEventListener("mouseenter", () => {
//                         gsap.to(el, { scale: 1.25, rotationX: 10, rotationY: 7, duration: 0.3, ease: "power2.out" });
//                     });
//                     el.addEventListener("mouseleave", () => {
//                         gsap.to(el, { scale: isMobile ? 1 : 1.15, rotationX: 0, rotationY: 0, duration: 0.3, ease: "power2.inOut" });
//                     });
//                     if (isMobile) {
//                         el.addEventListener("touchstart", () => {
//                             gsap.to(el, { scale: 1.25, rotationX: 10, rotationY: 7, duration: 0.3, ease: "power2.out" });
//                         });
//                         el.addEventListener("touchend", () => {
//                             gsap.to(el, { scale: 1, rotationX: 0, rotationY: 0, duration: 0.3, ease: "power2.inOut" });
//                         });
//                     }
//                 });

//                 return () => {
//                     timeline.kill();
//                     imgRefs.current.forEach((ref) => gsap.killTweensOf(ref.current));
//                 };
//             }
//         );

//         return () => mm.revert();
//     }, []);

//     return (
//         <div
//             ref={containerRef}
//             className="relative w-full mx-auto h-[70vh] md:h-[90vh] my-8 flex items-center justify-center bg-gradient-to-br from-white via-neutral-100 to-neutral-300 rounded-3xl overflow-hidden perspective-1500"
//             style={{ perspectiveOrigin: "50% 50%" }}
//         >
//             {/* Closed Box */}
//             <img
//                 ref={boxClosedRef}
//                 src="/images/OpenBox.png"
//                 alt="Closed Box"
//                 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
//                 style={{ width: "10rem", height: "10rem", willChange: "transform" }}
//             />

//             {/* Open Box */}
//             <img
//                 ref={boxOpenRef}
//                 src="/images/ClosedBox.png"
//                 alt="Open Box"
//                 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
//                 style={{ width: "10rem", height: "10rem", willChange: "transform" }}
//             />

//             {/* Product Items */}
//             {items.map((item, i) => (
//                 <React.Fragment key={item.title}>
//                     <img
//                         ref={imgRefs.current[i]}
//                         src={item.src}
//                         alt={item.alt}
//                         className="absolute w-36 h-24 md:w-56 md:h-36 rounded-xl shadow-lg      object-cover z-20"
//                         style={{ willChange: "transform, box-shadow" }}
//                     />
//                     <div
//                         ref={descRefs.current[i]}
//                         className={`absolute z-30 max-w-xs rounded-lg px-4 py-3 shadow-md text-sm border border-neutral-300 bg-white/95 ${item.descPosition}`}
//                         style={{ willChange: "transform, opacity", color: "#222", boxShadow: "0 12px 24px -4px #aaa6" }}
//                     >
//                         <div className="font-semibold text-sm md:text-lg text-neutral-800 mb-1">{item.title}</div>
//                         <div className="text-neutral-600">{item.desc}</div>
//                     </div>
//                 </React.Fragment>
//             ))}
//         </div>
//     );
// } "use client";
"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/context/ThemeContext";

const routineSteps = [
    {
        image: "/images/facewashh.png",
        title: "Step 1: Cleanse",
        instruction: "Use Face Wash",
        description: "Start your day with a deep cleanse",
        boxPosition: { x: 0, y: -180 },
        mobileBoxPosition: { x: 0, y: -100 }
    },
    {
           image: "/images/moistuizer.png",
        title: "Step 2: Hydrate",
        instruction: "Apply Moisturizer",
        description: "Lock in moisture for all-day hydration",
        boxPosition: { x: -120, y: 140 },
        mobileBoxPosition: { x: -80, y: 90 }
    },
    {
       image: "/images/serumc.png",
        title: "Step 3: Style",
        instruction: "Use Styling Serum",
        description: "Perfect your look with premium serum",
        boxPosition: { x: 0, y: 140 },
        mobileBoxPosition: { x: 0, y: 90 }
    },
    {
         image: "/images/facewashh.png",
        title: "Step 4: Glow",
        instruction: "Apply Face Glow Serum",
        description: "Achieve that natural, radiant glow",
        boxPosition: { x: 120, y: 140 },
        mobileBoxPosition: { x: 80, y: 90 }
    }
];

export default function BeautyRoutineAnimation() {
    const { bannerFolder } = useTheme();
    const [phase, setPhase] = useState('box-closed');
    const [currentStep, setCurrentStep] = useState(0);
    const containerRef = useRef(null);
    const boxClosedRef = useRef(null);
    const boxOpenRef = useRef(null);
    const productRefs = useRef(routineSteps.map(() => React.createRef()));
    const particlesRef = useRef([]);

    const getImagePath = (imageName) => `/${bannerFolder}/${imageName}`;
    const getRoutineSteps = () => {
        const images = bannerFolder === 'herImages' 
            ? ['Gemini_Generated_Image_53ycww53ycww53yc.png', 'Gemini_Generated_Image_fufytpfufytpfufy.png', 'Gemini_Generated_Image_kdir4vkdir4vkdir.png', 'Gemini_Generated_Image_n3zasln3zasln3za.png']
            : ['stylishhimbanner10.png', 'stylishhimbanner11.png', 'stylishhimbanner12.png', 'stylishhimbanner13.png'];
        
        return routineSteps.map((step, i) => ({
            ...step,
            image: getImagePath(images[i] || images[0])
        }));
    };

    // Create particles
    useEffect(() => {
        const particles = [];
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: #000;
                border-radius: 50%;
                opacity: 0;
                pointer-events: none;
                left: 50%;
                top: 50%;
            `;
            containerRef.current?.appendChild(particle);
            particles.push(particle);
        }
        particlesRef.current = particles;

        return () => particles.forEach(p => p.remove());
    }, []);

    // Main animation sequence
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        const tl = gsap.timeline();

        if (phase === 'box-closed') {
            // Initial setup
            gsap.set(boxClosedRef.current, { scale: 0.5, opacity: 0, rotation: -20 });
            gsap.set(boxOpenRef.current, { scale: 0.5, opacity: 0 });
            productRefs.current.forEach(ref => {
                gsap.set(ref.current, { scale: 0, opacity: 0, x: 0, y: 0 });
            });

            // Box entrance with loading animation
            tl.to(boxClosedRef.current, {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.6)"
            });

            // Box shake
            tl.to(boxClosedRef.current, {
                rotation: 8,
                duration: 0.08,
                repeat: 9,
                yoyo: true,
                ease: "power1.inOut"
            }, "+=0.4");

            // Trigger opening
            tl.call(() => setPhase('box-opening'), null, "+=0.3");

        } else if (phase === 'box-opening') {
            // Box opens
            tl.to(boxClosedRef.current, {
                scale: 1.2,
                opacity: 0,
                rotation: 15,
                duration: 0.6,
                ease: "power2.in"
            });

            tl.to(boxOpenRef.current, {
                scale: 1.3,
                opacity: 1,
                duration: 0.7,
                ease: "elastic.out(1, 0.5)"
            }, "<");

            // Particle explosion
            tl.call(() => {
                particlesRef.current.forEach((particle, i) => {
                    const angle = (Math.PI * 2 * i) / particlesRef.current.length;
                    const distance = 200 + Math.random() * 150;
                    gsap.fromTo(particle,
                        { x: 0, y: 0, opacity: 0, scale: 0 },
                        {
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            opacity: 0.7,
                            scale: 2,
                            duration: 1,
                            ease: "power2.out",
                            onComplete: () => {
                                gsap.to(particle, { opacity: 0, scale: 0, duration: 0.5 });
                            }
                        }
                    );
                });
            }, null, "+=0.2");

            // Products fly out - 1 above, 3 below with stagger
            routineSteps.forEach((step, i) => {
                const pos = isMobile ? step.mobileBoxPosition : step.boxPosition;
                tl.to(productRefs.current[i].current, {
                    x: pos.x,
                    y: pos.y,
                    scale: isMobile ? 0.7 : 0.9,
                    opacity: 1,
                    rotation: 360 + Math.random() * 180,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)"
                }, `-=${0.8 - i * 0.15}`);
            });

            // Trigger next phase
            tl.call(() => setPhase('all-products'), null, "+=1.5");

        } else if (phase === 'all-products') {
            // All products visible - enhanced floating animation
            productRefs.current.forEach((ref, i) => {
                gsap.to(ref.current, {
                    y: `+=${15 + i * 8}`,
                    rotation: `+=${10 - i * 5}`,
                    duration: 2 + i * 0.3,
                    repeat: 2,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });

            // Start step-by-step
            tl.call(() => {
                setPhase('step-by-step');
                setCurrentStep(0);
            }, null, "+=3.5");

        } else if (phase === 'step-by-step') {
            const step = routineSteps[currentStep];
            
            // Hide all other products with fade and scale
            productRefs.current.forEach((ref, i) => {
                if (i !== currentStep) {
                    tl.to(ref.current, {
                        scale: 0,
                        opacity: 0,
                        rotation: -180,
                        duration: 0.6,
                        ease: "power2.in"
                    }, 0);
                }
            });

            // Hide box
            tl.to(boxOpenRef.current, {
                scale: 0.5,
                opacity: 0,
                duration: 0.6,
                ease: "power2.in"
            }, 0);

            // Bring current product to center with entrance animation
            tl.to(productRefs.current[currentStep].current, {
                x: 0,
                y: isMobile ? -70 : -100,
                scale: isMobile ? 1.0 : 1.3,
                rotation: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            }, 0.4);

            // Product size increase animation (20% larger)
            tl.to(productRefs.current[currentStep].current, {
                scale: isMobile ? 2.0 : 2.8,
                duration: 0.8,
                ease: "back.out(1.5)"
            }, "+=0.2");

            // Settle to final size (20% increase from base)
            tl.to(productRefs.current[currentStep].current, {
                scale: isMobile ? 1.9 : 2.6,
                duration: 0.4,
                ease: "power2.inOut"
            });

            // Enhanced floating animation
            tl.to(productRefs.current[currentStep].current, {
                y: isMobile ? -80 : -110,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Particle effect with more impact
            tl.call(() => {
                particlesRef.current.slice(0, 25).forEach((particle, i) => {
                    const angle = (Math.PI * 2 * i) / 25;
                    const distance = 120 + Math.random() * 100;
                    const yOffset = isMobile ? -70 : -100;
                    gsap.fromTo(particle,
                        { x: 0, y: yOffset, opacity: 0, scale: 0 },
                        {
                            x: Math.cos(angle) * distance,
                            y: yOffset + Math.sin(angle) * distance,
                            opacity: 0.6,
                            scale: 1.5,
                            duration: 0.9,
                            ease: "power2.out",
                            onComplete: () => {
                                gsap.to(particle, { opacity: 0, duration: 0.4 });
                            }
                        }
                    );
                });
            }, null, 0.6);

            // Auto advance with smooth transition
            tl.call(() => {
                if (currentStep < routineSteps.length - 1) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setPhase('returning');
                }
            }, null, "+=3.5");

        } else if (phase === 'returning') {
            // Show all products again around box
            tl.to(boxOpenRef.current, {
                scale: 1.3,
                opacity: 1,
                duration: 0.7,
                ease: "elastic.out(1, 0.5)"
            }, 0.5);

            routineSteps.forEach((step, i) => {
                const pos = isMobile ? step.mobileBoxPosition : step.boxPosition;
                tl.to(productRefs.current[i].current, {
                    x: pos.x,
                    y: pos.y,
                    scale: isMobile ? 0.7 : 0.9,
                    opacity: 1,
                    rotation: 360,
                    duration: 1,
                    ease: "back.out(1.5)"
                }, 0.7 + i * 0.15);
            });

            // Brief display of all products
            tl.to({}, { duration: 1.5 });

            // Products return to box with smooth animation
            tl.to(productRefs.current.map(ref => ref.current), {
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0,
                rotation: -180,
                duration: 1,
                stagger: 0.12,
                ease: "power2.in"
            });

            // Box closes
            tl.to(boxOpenRef.current, {
                scale: 1.2,
                opacity: 0,
                duration: 0.6,
                ease: "power2.in"
            }, "-=0.5");

            tl.to(boxClosedRef.current, {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.6)"
            }, "<");

            // Restart
            tl.call(() => {
                setPhase('box-closed');
                setCurrentStep(0);
            }, null, "+=1.2");
        }

        return () => tl.kill();
    }, [phase, currentStep]);

    const isStepByStep = phase === 'step-by-step';
    const step = isStepByStep ? routineSteps[currentStep] : null;

    return (
      <div className="relative w-full min-h-[60vh] md:min-h-screen flex items-start md:items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#fff6ee] to-[#fdeedc] pt-2 md:pt-0">
      <div
                ref={containerRef}
                className="relative w-full h-[60vh] md:h-[90vh] flex items-center justify-center"
                style={{
                    perspective: '1500px',
                    perspectiveOrigin: '50% 50%'
                }}
            >
                {/* Boxes */}
                <img
                    ref={boxClosedRef}
                    src="/images/ClosedBox.png"
                    alt="Closed Box"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                    style={{ 
                        width: "10rem", 
                        height: "10rem",
                        filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.2))",
                        willChange: "transform"
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
                <img
                    ref={boxOpenRef}
                    src="/images/OpenBox.png"
                    alt="Open Box"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-15"
                    style={{ 
                        width: "10rem", 
                        height: "10rem",
                        filter: "drop-shadow(0 15px 30px rgba(0,0,0,0.2))",
                        willChange: "transform"
                    }}
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />

                {/* Products */}
                {routineSteps.map((step, i) => (
                    <img
                        key={i}
                        ref={productRefs.current[i]}
                        src={step.image}
                        alt={step.instruction}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                        style={{ 
                            width: "10rem", 
                            height: "10rem",
                            objectFit: "contain",
                            filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.15))",
                            willChange: "transform"
                        }}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200x200/ffffff/000000?text=Product';
                        }}
                    />
                ))}

                {/* Text Display with Enhanced Framer Motion */}
                <AnimatePresence mode="wait">
                    {isStepByStep && step && (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute left-1/2 -translate-x-1/2 bottom-4 md:top-[62%] flex flex-col items-center justify-center px-4 md:px-8 max-w-4xl z-40 w-full"
                        >
                            {/* Step indicator */}
                            <motion.div
                                initial={{ y: -40, opacity: 0, scale: 0.3 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 18,
                                    delay: 0.3
                                }}
                                className="mb-2 md:mb-4"
                            >
                                <div className="px-4 py-1 md:px-6 md:py-2 rounded-full bg-black/5 backdrop-blur-sm">
                                    <span className="text-black font-bold text-xs md:text-base tracking-wider">
                                        {step.title}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Instruction */}
                            <motion.div
                                initial={{ x: -120, opacity: 0, rotateY: -60, scale: 0.8 }}
                                animate={{ x: 0, opacity: 1, rotateY: 0, scale: 1 }}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 180,
                                    damping: 22,
                                    delay: 0.5
                                }}
                                className="mb-1.5 md:mb-2"
                            >
                                <h2 className="text-xl md:text-4xl lg:text-5xl font-black text-black text-center leading-none tracking-tight">
                                    {step.instruction}
                                </h2>
                            </motion.div>

                            {/* Description */}
                            <motion.div
                                initial={{ y: 40, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 18,
                                    delay: 0.7
                                }}
                                className="text-center"
                            >
                                <p className="text-xs md:text-base lg:text-lg text-gray-700 font-medium tracking-wide">
                                    {step.description}
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

           
            </div>
        </div>
    );
}