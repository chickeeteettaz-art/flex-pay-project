"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-6 md:p-10">
      <div className="w-full max-w-md text-center space-y-8">
        <div className="space-y-2">
          <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
            404
          </div>
          <div className="text-xl font-semibold text-muted-foreground">
            Page Not Found
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">
            Oops! Something went wrong
          </h1>
          <p className="text-muted-foreground text-base">
            We couldn't find the page you're looking for. It might have been moved or removed, but we're here to help you get back on track.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-32 h-32 bg-primary/5 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <Link href="/" className="w-full">
            <Button className="w-full" size="lg">
              <Home className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </Link>

        </div>

        {/* Additional Links */}
        <div className="pt-4 border-t border-muted">
          <p className="text-sm text-muted-foreground mb-3">
            Quick links:
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
