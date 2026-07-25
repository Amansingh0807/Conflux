import { PrismaClient, Channel, FlagType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Conflux database...");

  // Clean existing records
  await prisma.systemFlag.deleteMany({});
  await prisma.journeyEvent.deleteMany({});
  await prisma.customer.deleteMany({});

  // 1. Create Rohan Kapoor
  const customer = await prisma.customer.create({
    data: {
      id: "cust-rohan-kapoor-001",
      name: "Aman Singh",
      memberSince: 2021,
      frictionScore: 9,
      churnRisk: true,
      accountRef: "AX-884920-IN",
      creditLimit: "₹15,00,000",
      tier: "PLATINUM",
      journeyEvents: {
        create: [
          {
            timestamp: "09:00 AM",
            channel: Channel.WEB,
            action: "Web Knowledge Search",
            description: 'Customer searched "dispute charge" on website and viewed FAQ.',
            isError: false,
            isActive: false,
            ip: "Web Gateway Cluster #01",
            device: "Chrome v122 / macOS San Francisco",
            sessionId: "SESS-WEB-884920",
            endpoint: "/help/articles/dispute-charge-faq",
          },
          {
            timestamp: "09:15 AM",
            channel: Channel.WEB,
            action: "Checkout Intent Navigation",
            description: "Navigated to Cart/Checkout page.",
            isError: false,
            isActive: false,
            ip: "Web Gateway Cluster #01",
            device: "Chrome v122 / macOS San Francisco",
            sessionId: "SESS-WEB-884920",
            endpoint: "/checkout/payment-review",
            amount: "₹50,000",
          },
          {
            timestamp: "09:17 AM",
            channel: Channel.APP,
            action: "iOS Mobile Session Auth",
            description: "Logged into iOS App. Attempted ₹50,000 transaction.",
            isError: false,
            isActive: false,
            ip: "Mobile Cellular Node (Protected)",
            device: "iPhone 15 Pro / iOS 17.4",
            sessionId: "APP-IOS-990214",
            endpoint: "/api/v2/payments/initiate",
            amount: "₹50,000",
          },
          {
            timestamp: "09:17 AM",
            channel: Channel.APP,
            action: "Gateway API Failure",
            description: "API returned HTTP 503 Gateway Timeout.",
            isError: true,
            isActive: false,
            ip: "Internal Payment Gateway #08",
            device: "Payment Core Microservice",
            sessionId: "APP-IOS-990214",
            endpoint: "POST /v2/transactions/charge",
            httpStatus: "503 SERVICE_UNAVAILABLE",
            amount: "₹50,000",
          },
          {
            timestamp: "09:18 AM",
            channel: Channel.CALL,
            action: "Inbound PSTN Voice Call",
            description: "Incoming Call to Customer Care.",
            isError: false,
            isActive: true,
            ip: "SIP Voice Routing Node #04",
            device: "Mobile Voice Line (+91 98*** ****",
            sessionId: "CALL-PSTN-774920",
            endpoint: "IVR Routing Node -> Agent #4402",
          },
        ],
      },
      systemFlags: {
        create: [
          {
            type: FlagType.DROPOFF,
            title: "Cart Drop-off Detected",
            subtext: "Customer abandoned checkout 30 mins ago.",
            badgeText: "HIGH",
            detail: "Cart Value: ₹50,000",
          },
          {
            type: FlagType.ESCALATION,
            title: "Escalation Warning",
            subtext: "2+ complaints logged in the last 7 days.",
            badgeText: "WARN",
            detail: "Risk Trend: Elevating",
          },
          {
            type: FlagType.UNRESOLVED,
            title: "Unresolved Issue",
            subtext: "Previous ticket #8832 open for >7 days.",
            badgeText: "OVERDUE",
            detail: "Ticket SLA Breach",
          },
        ],
      },
    },
  });

  console.log(`Successfully seeded Customer: ${customer.name} (ID: ${customer.id})`);
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
