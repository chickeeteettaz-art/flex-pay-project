import React from "react";
import {
    CreditCard,
    Wallet,
    SearchCheck,
    Zap,
    Shield,
    Users,
    ArrowRight,
    CheckCircle,
    Clock,
    BellRing
} from "lucide-react";

export default function Page() {
    const services = [
        {
            title: "Make Deposits",
            description: "Securely add funds to your Flex Pay wallet via bank transfer, card, or mobile money. Your balance is always ready for instant payments.",
            icon: Wallet,
            color: "bg-emerald-100 text-emerald-700",
            features: ["Instant crediting", "Multiple payment methods", "No hidden fees"]
        },
        {
            title: "Online Payments",
            description: "Pay for goods, services, or subscriptions with one click. Seamless checkout experience across thousands of merchants.",
            icon: CreditCard,
            color: "bg-blue-100 text-blue-700",
            features: ["One-click checkout", "Merchant rewards", "Recurring billing support"]
        },
        {
            title: "Track Payments",
            description: "Monitor every transaction in real-time. Get instant notifications and detailed reports for all incoming and outgoing payments.",
            icon: SearchCheck,
            color: "bg-purple-100 text-purple-700",
            features: ["Live transaction feed", "Download receipts", "Spending analytics"]
        }
    ];

    const steps = [
        {
            step: "01",
            title: "Create an Account",
            description: "Sign up in under 2 minutes with your email or phone number. Verify your identity to unlock full features.",
            icon: Users
        },
        {
            step: "02",
            title: "Add Funds",
            description: "Deposit money into your Flex Pay wallet using your preferred payment method. Your funds are held securely in FDIC-insured accounts.",
            icon: Wallet
        },
        {
            step: "03",
            title: "Pay Anywhere",
            description: "Use Flex Pay at checkout on any partner site or scan QR codes at physical stores. Complete payments in seconds.",
            icon: Zap
        },
        {
            step: "04",
            title: "Track Everything",
            description: "Get real-time updates and detailed insights on every payment. Manage budgets and set spending limits.",
            icon: Clock
        }
    ];

    const stats = [
        { value: "50K+", label: "Active Users" },
        { value: "$12M+", label: "Processed Monthly" },
        { value: "99.99%", label: "Uptime" },
        { value: "24/7", label: "Support" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">


            {/* Services Section */}
            <div className="px-4 py-16 lg:py-24 lg:px-6 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        Everything you need in one place
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Flex Pay combines the most essential payment tools into a seamless, secure platform.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-transparent rounded-2xl shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md hover:border-indigo-200 group"
                            >
                                <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-800 mb-2">{service.title}</h3>
                                <p className="text-slate-500 mb-4">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2 text-sm text-slate-600">
                                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-slate-50 px-4 py-16 lg:py-24 lg:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                            How Flex Pay Works
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">
                            Get started in minutes and start paying smarter.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div key={idx} className="relative bg-transparent rounded-xl p-6 shadow-sm border border-slate-200">
                                    <div className="text-4xl font-bold text-indigo-200 mb-4">{step.step}</div>
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold text-slate-800 mb-2">{step.title}</h3>
                                    <p className="text-sm text-slate-500">{step.description}</p>
                                    {idx < steps.length - 1 && (
                                        <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2">
                                            <ArrowRight className="w-5 h-5 text-slate-300" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Security & Trust Section */}
            <div className="px-4 py-16 lg:py-20 lg:px-6 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-3 py-1 text-sm font-medium text-indigo-700 mb-4">
                            <Shield className="w-4 h-4" />
                            Security First
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-4">
                            Bank-grade security for every transaction
                        </h2>
                        <p className="text-slate-500 mb-6">
                            Flex Pay uses 256-bit encryption, PCI DSS Level 1 compliance, and real-time fraud detection. Your money and data are always protected.
                        </p>
                        <div className="space-y-3">
                            {[
                                "End-to-end encryption for all transactions",
                                "Two-factor authentication available",
                                "24/7 AI-powered fraud monitoring",
                                "Zero liability for unauthorized payments"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                    </div>
                                    <span className="text-slate-600">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}