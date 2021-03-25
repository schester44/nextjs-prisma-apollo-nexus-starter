import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  await prisma.subscriptionPlan.create({
    data: {
      pricePerMonth: 3400,
      externalProductId: "price_1IWtn7FekyIaHSTbfvPykNm4",
    },
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
