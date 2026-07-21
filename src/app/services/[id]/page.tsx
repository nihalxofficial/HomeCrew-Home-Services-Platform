import { getServiceById } from '@/lib/api/services';
import { notFound } from 'next/navigation';
import ServiceDetailsClient from './ServiceDetailsClient';

interface ServiceDetailsPageProps {
  params: {
    id: string;
  };
}

const ServiceDetailsPage = async ({ params }: ServiceDetailsPageProps) => {
  const { id } = await params;
  
    const serviceDetails = await getServiceById(id);

  if (!serviceDetails) {
    notFound();
  }
  
  return <ServiceDetailsClient service={serviceDetails} />;
};

export default ServiceDetailsPage;