import Button from "@/components/Button";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import SizeReviewList from "@/components/SizeReviewList";
import StarRating from "@/components/StarRating";
import axios from "@/lib/axios";
import styles from "@/styles/Product.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Product() {
  const [product, setProduct] = useState();
  const [sizeReviews, setSizeReviews] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  async function getProduct(targetId) {
    const res = await axios.get(`/products/${targetId}`);
    const nextProduct = res.data;
    setProduct(nextProduct);
  }

  async function getSizeReviews(targetId) {
    const res = await axios.get(`/size_reviews/?product_id=${targetId}`);
    const nextSizeReviews = res.data.results ?? [];
    setSizeReviews(nextSizeReviews);
  }

  const [formValue, setFromValue] = useState({
    size: "M",
    sex: "male",
    height: 173,
    fit: "good",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sizeReview = {
      ...formValue,
      productId: product.id,
    };
    const response = await axios.post("/size_reviews/", sizeReview);
    const newSizeReview = response.data;
    setSizeReviews((prevSizereviews) => [newSizeReview, ...prevSizereviews]);
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleChange = async (name, value) => {
    setFromValue({
      ...formValue,
      [name]: value,
    });
  };

  useEffect(() => {
    if (!id) return;

    getProduct(id);
    getSizeReviews(id);
  }, [id]);

  if (!product) return null;

  return (
    <>
      <Head>
        <title>Codeitmall: {product.name}</title>
      </Head>
      <h1 className={styles.name}>
        {product.name}
        <span className={styles.englishName}>{product.englishName}</span>
      </h1>
      <div className={styles.content}>
        <div>
          <img
            className={styles.image}
            src={product.imgUrl}
            alt={product.name}
          />
        </div>
        <div>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>제품 정보</h2>
            <div className={styles.info}>
              <table className={styles.infoTable}>
                <tbody>
                  <tr>
                    <th>브랜드 / 품번</th>
                    <td>
                      {product.brand} / {product.productCode}
                    </td>
                  </tr>
                  <tr>
                    <th>제품명</th>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <th>가격</th>
                    <td>
                      <span className={styles.salePrice}>
                        {product.price.toLocaleString()}원
                      </span>{" "}
                      {product.salePrice.toLocaleString()}원
                    </td>
                  </tr>
                  <tr>
                    <th>포인트 적립</th>
                    <td>{product.point.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>구매 후기</th>
                    <td className={styles.starRating}>
                      <StarRating value={product.starRating} />{" "}
                      {product.starRatingCount.toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <th>좋아요</th>
                    <td className={styles.like}>
                      ♥{product.likeCount.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>사이즈 추천</h2>
            <SizeReviewList sizeReviews={sizeReviews ?? []} />
          </section>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>사이즈 추천하기</h2>
            <form className={styles.sizeForm} onSubmit={handleSubmit}>
              <label className={styles.label}>
                사이즈
                <Dropdown
                  className={styles.input}
                  name="size"
                  value={formValue.size}
                  options={[
                    { label: "S", value: "S" },
                    { label: "M", value: "M" },
                    { label: "L", value: "L" },
                    { label: "XL", value: "XL" },
                  ]}
                  onChange={handleChange}
                />
              </label>
              <label className={styles.label}>
                성별
                <Dropdown
                  className={styles.input}
                  name="sex"
                  value={formValue.sex}
                  onChange={handleChange}
                  options={[
                    { label: "남성", value: "male" },
                    { label: "여성", value: "female" },
                  ]}
                />
              </label>
              <label className={styles.label}>
                키
                <Input
                  className={styles.input}
                  name="height"
                  min="50"
                  max="200"
                  type="number"
                  value={formValue.height}
                  onChange={handleInputChange}
                />
              </label>
              <label className={styles.label}>
                사이즈 추천
                <Dropdown
                  className={styles.input}
                  name="fit"
                  value={formValue.fit}
                  options={[
                    { label: "작음", value: "small" },
                    { label: "적당함", value: "good" },
                    { label: "큼", value: "big" },
                  ]}
                  onChange={handleChange}
                />
              </label>
              <Button className={styles.submit}>작성하기</Button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
