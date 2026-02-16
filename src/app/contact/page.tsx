"use client";

import { useState } from "react";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Facebook,
    Instagram,
    MessageCircle
} from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message sent!");
        // In a real app, you'd send this data to an API
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                {/* Left Column: Info & Map */}
                <div className="flex flex-col gap-8">

                    {/* Contact Details */}
                    <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
                        <h2 className="text-2xl font-bold font-heading text-white mb-6">Contact Information</h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Visit Us</h3>
                                    <p className="text-zinc-400">123 Tech Avenue, Colombo 03, Sri Lanka</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Call Us</h3>
                                    <p className="text-zinc-400">+94 77 123 4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Email Us</h3>
                                    <p className="text-zinc-400">support@nexuspc.lk</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Opening Hours</h3>
                                    <p className="text-zinc-400">Mon - Sat: 9:00 AM - 8:00 PM</p>
                                    <p className="text-zinc-400">Sun: 10:00 AM - 5:00 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-8 pt-8 border-t border-white/10 flex gap-4">
                            <button className="p-3 bg-zinc-800 hover:bg-cyan-500 hover:text-black transition-colors rounded-lg text-zinc-400">
                                <Facebook className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-zinc-800 hover:bg-pink-500 hover:text-white transition-colors rounded-lg text-zinc-400">
                                <Instagram className="w-5 h-5" />
                            </button>
                            <button className="p-3 bg-zinc-800 hover:bg-green-500 hover:text-black transition-colors rounded-lg text-zinc-400" title="WhatsApp">
                                <MessageCircle className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.8038556114!2d79.82118596001292!3d6.92192257611592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1710520000000!5m2!1sen!2slk"
                            className="w-full h-64 grayscale invert"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Right Column: Message Form */}
                <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-2xl backdrop-blur-md h-fit">
                    <h2 className="text-3xl font-bold font-heading text-white mb-2">Get in Touch</h2>
                    <p className="text-zinc-400 mb-8">Have a question about a custom build or component? Send us a message and we'll get back to you shortly.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-zinc-300">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-zinc-300">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-zinc-300">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                                placeholder="Custom Build Inquiry"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-zinc-300">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                                placeholder="Tell us what you're looking for..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 px-6 rounded-lg bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/20"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
