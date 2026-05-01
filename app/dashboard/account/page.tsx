import React from 'react';
import {
    User,
    CreditCard,
    TrendingUp,
    Calendar,
    Edit2,
    ArrowUpRight
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const AccountManagement = () => {
    // Mock data - replace with your real data (useState, useQuery, etc.)
    const account = {
        name: "John Doe",
        email: "john.doe@example.com",
        accountNumber: "ACC-98765432",
        balance: 12450.75,
        totalTransactions: 47,
        thisMonthTransactions: 8,
        joined: "March 2024",
        avatar:""
    };



    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Page Header */}
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Account Management</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your profile and monitor your account performance
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Profile Sidebar */}
                    <div className="lg:col-span-4">
                        <Card>
                            <CardHeader className="text-center pb-2">
                                <Avatar className="w-24 h-24 mx-auto border-4 border-background shadow">
                                    <AvatarImage src={account.avatar} />
                                    <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                                        {account.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <CardTitle className="mt-4 text-2xl">{account.name}</CardTitle>
                                <CardDescription>{account.email}</CardDescription>
                                <Badge variant="secondary" className="mt-2">
                                    {account.accountNumber}
                                </Badge>
                            </CardHeader>

                            <CardContent>
                                <Button className="w-full" size="lg">
                                    <Edit2 className="mr-2 h-4 w-4" />
                                    Edit Profile
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Stats Cards */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                        {/* Balance Card */}
                        <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-primary" />
                                    Account Balance
                                </CardTitle>
                                <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                                    Available
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="text-5xl font-bold tracking-tighter text-foreground">
                                    R{account.balance.toLocaleString('en-ZA')}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">South African Rand (ZAR)</p>
                            </CardContent>
                        </Card>

                        {/* Total Transactions */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Total Transactions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-5xl font-bold tracking-tighter">{account.totalTransactions}</p>
                                <p className="text-sm text-muted-foreground">All time</p>
                            </CardContent>
                        </Card>

                        {/* This Month */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    This Month
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-5xl font-bold tracking-tighter">{account.thisMonthTransactions}</p>
                                    <span className="text-muted-foreground">transactions</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Member Since */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg">Member Since</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-4xl font-semibold tracking-tight">{account.joined}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Quick Actions / More Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Your latest transactions will appear here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center py-12 text-muted-foreground">
                                No recent transactions to show yet.
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="ghost" className="w-full justify-between h-12">
                                Security & Password
                                <ArrowUpRight className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-between h-12">
                                Notification Preferences
                                <ArrowUpRight className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-between h-12">
                                Linked Bank Accounts
                                <ArrowUpRight className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" className="w-full justify-between h-12 text-destructive hover:text-destructive">
                                Close Account
                                <ArrowUpRight className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AccountManagement;