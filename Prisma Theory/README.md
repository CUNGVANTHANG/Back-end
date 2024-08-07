## Prisma Theory

**Khởi tạo Prisma:**

```
npx prisma init
```

**Generate từ prisma sang database**

```
npx prisma migrate dev --name init
```

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Mọi định dạng trong prisma đều phải có ID
model User {
  id   Int    @id @default(autoincrement()) // Định dạng tự động tăng id
  name String
}
```

---

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
```

**Mở Prisma Studio**

```
npx prisma studio
```

![image](https://github.com/user-attachments/assets/c6683ddf-40f7-4782-8e4b-ae0508e29808)
