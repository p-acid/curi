import {
  AdditionalImages,
  CategorySelector,
  MainImage,
  MeetingTypeSelector,
  SessionForm,
  TitleInput,
} from "./src/ui";

const HomePage = () => {
  return (
    <main className="content flex gap-10 max-mobile:flex-col max-mobile:gap-0">
      <section className="flex-1">
        <MainImage />
        <AdditionalImages />
      </section>
      <section className="flex-1">
        <CategorySelector />
        <TitleInput />
        <MeetingTypeSelector />
        <SessionForm />
      </section>
    </main>
  );
};

export default HomePage;
