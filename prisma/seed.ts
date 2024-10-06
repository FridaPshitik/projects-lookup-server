import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.external.createMany({
    data: [
      {
        name: 'סקייבר',
        image: 'skyvar.png',
      },
    ],
  });
  await prisma.internal.createMany({
    data: [
      {
        name: 'יחידת ציפור',
        command: 'פיקוד צפון',
        department: '',
        contact: 'רפי',
        phone: '0534189652',
        email:'r@tzipor.co.il'
      },
    ],
  });
  await prisma.project.createMany({
    data: [
      {
        name: 'תיעוד',
        purpose: 'תיעוד פרויקטים',
        description:
          'פרויקט זה נועד על מנת למנוע כפילות פיתוח קוד של פרוייקט קיים.\nהפרוייקט ייתן אפשרויות חיפוש מתקדמות.',
        productionTime: new Date(),
        factorableType: 'חיצוני',
        requiresId: 1,
        status: 'בתהליך',
        externalId: 1,
        classification: 'סודי',
        environment: 'שחורה',
        population: ['קבע', 'חובה'],
      },
      {
        name: 'פנימי',
        purpose: 'תיעוד פרויקטים',
        description:
          'פרויקט זה נועד על מנת למנוע כפילות פיתוח קוד של פרוייקט קיים.\nהפרוייקט ייתן אפשרויות חיפוש מתקדמות.',
        productionTime: new Date(),
        factorableType: 'פנימי',
        requiresId: 1,
        status: 'בתהליך',
        internalId: 1,
        classification: 'שמור',
        environment: 'אדומה',
        population: ['מילואים'],
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
