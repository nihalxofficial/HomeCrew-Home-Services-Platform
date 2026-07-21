import { getAllServices } from '@/lib/api/services';
import ServicesClient from './ServicesClient';

interface ServicesPageProps {
  searchParams?: Promise<{
    page?: string;
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  }> | {
    page?: string;
    category?: string;
    search?: string;
    sort?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

const ServicesPage = async (props: ServicesPageProps) => {
  const searchParams = await props.searchParams;
  const page = searchParams?.page || '1';
  const category = searchParams?.category || '';
  const search = searchParams?.search || '';
  const sort = searchParams?.sort || 'newest';
  const minPrice = searchParams?.minPrice || '';
  const maxPrice = searchParams?.maxPrice || '';

  const response = await getAllServices({
    page,
    category,
    search,
    sort,
    minPrice,
    maxPrice,
    limit: 8,
  });

  return (
    <ServicesClient
      initialServices={response?.data || []}
      totalCount={response?.totalCount || 0}
      totalPages={response?.totalPages || 1}
      currentPage={response?.currentPage || 1}
    />
  );
};

export default ServicesPage;