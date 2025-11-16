import { CategoryList } from "./src/ui";

const CategoryPage = () => {
  return (
    <main className="content">
      <div className="box">
        <h2 className="heading-1 whitespace-pre">
          어떤 카테고리의
          <br />
          콘텐츠를 만드시나요?
        </h2>
        <p className="title-1 text-[#767676]">최대 2개까지 선택 가능합니다.</p>
      </div>

      <CategoryList />
    </main>
  );
};

export default CategoryPage;
