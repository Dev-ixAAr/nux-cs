"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from "lucide-react";
import { NeonButton } from "@/components/ui/neon-button";

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted");
        // Add toast or feedback here later
    };

    return (
        <div className="min-h-screen bg-zinc-950 pt-24 pb-12">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-heading text-4xl font-bold text-white md:text-5xl"
                    >
                        Get in <span className="text-cyan-500">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-zinc-400"
                    >
                        Have questions about a build? Visit our store or send us a message.
                    </motion.p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">

                    {/* Left Column: Contact Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Info Cards */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors hover:border-cyan-500/30">
                                <MapPin className="mb-4 h-8 w-8 text-cyan-500" />
                                <h3 className="mb-2 font-bold text-white">Visit Us</h3>
                                <p className="text-sm text-zinc-400">
                                    123 Tech Street,<br />
                                    Colombo 03, Sri Lanka
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors hover:border-cyan-500/30">
                                <Phone className="mb-4 h-8 w-8 text-cyan-500" />
                                <h3 className="mb-2 font-bold text-white">Call Us</h3>
                                <p className="text-sm text-zinc-400">
                                    +94 77 123 4567<br />
                                    +94 11 234 5678
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors hover:border-cyan-500/30">
                                <Mail className="mb-4 h-8 w-8 text-cyan-500" />
                                <h3 className="mb-2 font-bold text-white">Email Us</h3>
                                <p className="text-sm text-zinc-400">
                                    support@nexuspc.lk<br />
                                    sales@nexuspc.lk
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm transition-colors hover:border-cyan-500/30">
                                <Clock className="mb-4 h-8 w-8 text-cyan-500" />
                                <h3 className="mb-2 font-bold text-white">Working Hours</h3>
                                <p className="text-sm text-zinc-400">
                                    Mon - Sat: 9.00 AM - 7.00 PM<br />
                                    Sunday: Closed
                                </p>
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div className="h-[300px] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80385596489!2d79.82118606883204!3d6.921838637775586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1708149864232!5m2!1sen!2slk"
                                width="100%"
                                height="100%"
                                style={{ border: 0, filter: "grayscale(1) invert(1) contrast(1.2)" }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl"
                    >
                        <h2 className="mb-6 text-2xl font-bold text-white">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-zinc-300">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full rounded-xl border border-white/10 bg-black/50 p-4 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        className="w-full rounded-xl border border-white/10 bg-black/50 p-4 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-zinc-300">Subject</label>
                                <input
                                    id="subject"
                                    type="text"
                                    placeholder="How can we help?"
                                    className="w-full rounded-xl border border-white/10 bg-black/50 p-4 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-zinc-300">Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="Tell us about your custom build requirements..."
                                    className="w-full resize-none rounded-xl border border-white/10 bg-black/50 p-4 text-white placeholder:text-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                                />
                            </div>

                            <NeonButton variant="primary" className="w-full justify-center font-bold text-lg h-14">
                                Send Message
                                <Send className="ml-2 h-5 w-5" />
                            </NeonButton>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
