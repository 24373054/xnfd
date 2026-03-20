import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // 创建管理员账号
  await db.user.upsert({
    where: { email: "admin@xnfd.cn" },
    update: {},
    create: {
      email: "admin@xnfd.cn",
      name: "管理员",
      password: "xnfd2025",
      role: "admin",
    },
  });

  // 种入调研记录
  const records = [
    { area: "蔡甸区", subject: "蔡甸莲藕合作社A", type: "合作社", date: new Date("2026-03-05"), issues: JSON.stringify(["无书面合同", "电商侵权"]), hasIntent: true },
    { area: "蔡甸区", subject: "蔡甸莲藕合作社B", type: "合作社", date: new Date("2026-03-06"), issues: JSON.stringify(["地标使用不规范"]), hasIntent: true },
    { area: "洪山区", subject: "洪山菜薹种植户1", type: "种植户", date: new Date("2026-03-08"), issues: JSON.stringify(["收购合同纠纷", "价格欺诈"]), hasIntent: true },
    { area: "黄陂区", subject: "木兰民宿经营者", type: "文旅经营者", date: new Date("2026-03-10"), issues: JSON.stringify(["安全责任不清", "无公众责任险"]), hasIntent: false },
  ];

  for (const r of records) {
    await db.researchRecord.create({ data: r });
  }

  // 种入驿站活动
  await db.stationEvent.create({
    data: {
      title: "黄陂木兰乡村法律服务日",
      area: "黄陂区",
      address: "黄陂区木兰景区游客中心",
      date: new Date("2026-04-05"),
      startTime: "09:00",
      endTime: "17:00",
      description: "提供免费法律咨询、合同审查、普法宣传",
    },
  });

  console.log("✅ Seed 完成");
}

main().catch(console.error).finally(() => db.$disconnect());
