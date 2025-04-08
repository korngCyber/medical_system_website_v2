import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function OrderSuccessPage() {
  return (
    <div className="container py-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your order. We've received your request and will process it shortly.
        </p>

        <div className="bg-muted p-4 rounded-md mb-6 text-left">
          <h2 className="font-medium mb-2">Order Details</h2>
          <p className="text-sm text-muted-foreground mb-1">
            Order ID: ORD-{Math.floor(100000 + Math.random() * 900000)}
          </p>
          <p className="text-sm text-muted-foreground mb-1">Date: {new Date().toLocaleDateString()}</p>
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link href="/profile">
            <Button>View Order History</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
