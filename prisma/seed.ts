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
        communicationType: 'PHONE',
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
        factorableType: 'EXTERNAL',
        requiresId: 1,
        status: 'IN_PROGRESS',
        externalId: 1,
        classification: 'SODI',
        environment: 'BLACk',
        population: ['MUST', 'ATUDA'],
      },
      {
        name: 'פנימי',
        purpose: 'תיעוד פרויקטים',
        description:
          'פרויקט זה נועד על מנת למנוע כפילות פיתוח קוד של פרוייקט קיים.\nהפרוייקט ייתן אפשרויות חיפוש מתקדמות.',
        productionTime: new Date(),
        factorableType: 'INTERNAL',
        requiresId: 1,
        status: 'IN_PROGRESS',
        internalId: 1,
        classification: 'SHAMUR',
        environment: 'RED',
        population: ['MILUIM'],
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
