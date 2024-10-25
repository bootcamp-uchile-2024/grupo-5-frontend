import { MainLayout } from "../layout/MainLayout";
import { ResumenCarrito } from "../components/resumenCarrito.tsx";

export const ResumenPage = () => {
  return (
    <MainLayout>
      <div>
        <ResumenCarrito />
      </div>
    </MainLayout>
  );
};
