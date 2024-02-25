import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button.jsx';
import { updateOrder } from '../../services/apiRestaurant.js';

const UpdateOrder = ({ order }) => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
};

export default UpdateOrder;

export async function updateOrderAction({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
