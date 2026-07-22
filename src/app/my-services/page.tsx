import { getServicesByCreator } from '@/lib/api/services';
import { getUserSession } from '@/lib/core/session';
import MyServicesClient from './MyServicesClient';

const MyServicesPage = async () => {
  const user = await getUserSession();
  const id = user?.id
  const response = await getServicesByCreator(id);
  
  return <MyServicesClient services={response.data} userId={id} />;
};

export default MyServicesPage;