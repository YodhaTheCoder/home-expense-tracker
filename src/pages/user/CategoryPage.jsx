import CategoryList from '../../components/CategoryList';
import { useCategories } from '../../hooks/useCategories';

export default function CategoryPage({ auth }) {
  const { categories } = useCategories(auth.user.username);

  return <CategoryList categories={categories} />;
}
