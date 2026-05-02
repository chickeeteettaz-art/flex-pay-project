"use client";

import {useEffect, useState} from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, CreditCard, Wallet, IdCard } from "lucide-react";
import {createClient} from "@/lib/client";
const supabase = createClient();

export default function AccountPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showDeposit, setShowDeposit] = useState(false);

    const [account, setAccount] = useState({
        fullName: "Palesa Sekgobela",
        accountNumber: "1234567890123456",
        idNumber: "9901011234087",
        balance: 12500.75,
    });

    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
    });

    const [depositAmount, setDepositAmount] = useState("");



    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const handleSaveProfile = () => {
        console.log("Updated Profile:", account);
        setIsEditing(false);
    };

    const handleChangePassword = () => {
        console.log("Password Changed:", passwordData);
        setShowPassword(false);
        setPasswordData({ current: "", new: "" });
    };



    const [data, setData] = useState({
        balance: 0,
        paymentCount: 0,
        totalPaymentsValue: 0,
        accountNumber: "",
        loading: true,
        fullName: "",
        idNumber:"",
        id:''
    })

    useEffect(() => {
        async function getDashboardData() {
            // 1. Get the authenticated user
            const { data: { user }, error: authError } = await supabase.auth.getUser()

            if (authError || !user) {
                console.error("Auth error:", authError)
                return
            }

            const userId = user.id

            // 2. Run queries in parallel for better performance
            const [accountRes] = await Promise.all([
                // Get account details
                supabase
                    .from('account')
                    .select('balance, account_number,id,full_name,id_number')
                    .eq('user_id', userId)
                    .single(),


            ])
            const {data, error} = await supabase
                .from('payment')
                .select('amount')
                .eq('account_id', accountRes.data?.id)

            const totalSum = data?.reduce((acc, curr) => acc + curr.amount, 0) ?? 0

            setData({
                balance: accountRes.data?.balance ?? 0,
                accountNumber: accountRes.data?.account_number ?? "N/A",
                totalPaymentsValue: totalSum,
                paymentCount: data?.length ?? 0,
                loading: false,
                fullName:accountRes.data?.full_name ?? "N/A",
                idNumber:accountRes.data?.id_number ?? "N/A",
                id:accountRes.data?.id ?? "N/A"
            })
        }

        getDashboardData()
    }, [])

    const handleDeposit = async () => {
        const depositAmounted = parseFloat(depositAmount);
        const amount = depositAmounted + data.balance;


        if (!isNaN(amount) && amount > 0) {
            const { data: updated, error: updateError } = await supabase
                .from('payment')
                .update({ amount: depositAmounted })
                .eq('id', data.id)
                .select()
                .single()

            if (updateError) throw updateError

            alert("Deposit successful")
        }


        setDepositAmount("");
        setShowDeposit(false);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">


            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-md">
                    {getInitials(data.fullName)}
                </div>

                <div>
                    <p className="font-semibold text-lg">{data.fullName}</p>
                    <p className="text-sm text-gray-500">Account Holder</p>
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-6">
                Account Management
            </h1>


            <Card className="max-w-lg shadow-xl rounded-2xl">
                <CardContent className="p-6 space-y-4">


                    <div className="flex items-center gap-3">
                        <User className="text-gray-500" />
                        <div className="w-full">
                            <p className="text-sm text-gray-500">Full Name</p>

                            {isEditing ? (
                                <Input
                                    value={data.fullName}
                                    onChange={(e) =>
                                        setAccount({ ...account, fullName: e.target.value })
                                    }
                                />
                            ) : (
                                <p className="font-semibold">{data.fullName}</p>
                            )}
                        </div>
                    </div>


                    <div className="flex items-center gap-3">
                        <CreditCard className="text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">Account Number</p>
                            <p className="font-semibold">
                                **** **** **** {data.accountNumber.toString().slice(-4)}
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center gap-3">
                        <IdCard className="text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-500">ID Number</p>
                            <p className="font-semibold">
                                **** **** {data.idNumber.slice(-4)}
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center gap-3">
                        <Wallet className="text-green-600" />
                        <div>
                            <p className="text-sm text-gray-500">Balance</p>
                            <p className="text-xl font-bold text-green-600">
                                R {data.balance.toFixed(2)}
                            </p>
                        </div>
                    </div>


                    {isEditing ? (
                        <div className="flex gap-2">
                            <Button onClick={handleSaveProfile} className="w-full">
                                Save Changes
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditing(false)}
                                className="w-full"
                            >
                                Cancel
                            </Button>
                        </div>
                    ) : (
                        <Button
                            className="w-full mt-4"
                            onClick={() => setIsEditing(true)}
                        >
                            Update Account Details
                        </Button>
                    )}

                </CardContent>
            </Card>


            <Card className="mt-6 max-w-lg shadow-lg rounded-2xl">
                <CardContent className="p-6 space-y-4">

                    <h3 className="font-semibold text-lg">Change Password</h3>

                    {showPassword ? (
                        <>
                            <Input
                                type="password"
                                placeholder="Current Password"
                                value={passwordData.current}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        current: e.target.value,
                                    })
                                }
                            />

                            <Input
                                type="password"
                                placeholder="New Password"
                                value={passwordData.new}
                                onChange={(e) =>
                                    setPasswordData({
                                        ...passwordData,
                                        new: e.target.value,
                                    })
                                }
                            />

                            <div className="flex gap-2">
                                <Button onClick={handleChangePassword} className="w-full">
                                    Save Password
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => setShowPassword(false)}
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button
                            onClick={() => setShowPassword(true)}
                            className="w-full"
                        >
                            Change Password
                        </Button>
                    )}

                </CardContent>
            </Card>


            <Card className="mt-6 max-w-lg shadow-lg rounded-2xl">
                <CardContent className="p-6 space-y-4">

                    <h3 className="font-semibold text-lg">
                        Deposit Funds
                    </h3>

                    {showDeposit ? (
                        <>
                            <Input
                                type="number"
                                placeholder="Enter amount"
                                value={depositAmount}
                                onChange={(e) => setDepositAmount(e.target.value)}
                            />

                            <div className="flex gap-2">
                                <Button onClick={handleDeposit} className="w-full">
                                    Confirm Deposit
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={() => setShowDeposit(false)}
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </>
                    ) : (
                        <Button
                            onClick={() => setShowDeposit(true)}
                            className="w-full"
                        >
                            Deposit
                        </Button>
                    )}

                </CardContent>
            </Card>
        </div>
    );
}