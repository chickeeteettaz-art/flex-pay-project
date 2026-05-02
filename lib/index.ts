interface Payment {

    created_at: string,
        account_id: number,
    amount: number,
    currency: string,
    swift_code: string,
    account_number: string,
    date: string,
    payee_name: string,
    id: number,
    status: string,
    account: { user_id: string }

}