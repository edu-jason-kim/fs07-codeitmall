import styles from "@/styles/test.module.css";
import Image from "next/image";

export default function Test() {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          fill
          src="/image.jpg"
          alt="배경"
          style={{ objectFit: "cover" }}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className={styles.image}>
        <Image
          fill
          src="/image.jpg"
          alt="배경"
          style={{ objectFit: "cover" }}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>
      <div className={styles.image}>
        <Image
          fill
          src="/image.jpg"
          alt="배경"
          style={{ objectFit: "cover" }}
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
