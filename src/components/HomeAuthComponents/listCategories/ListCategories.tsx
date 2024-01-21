'use client'
import categoriesService, { CategoryType } from '@/services/categoriesService';
import styles from './styles.module.scss'
import useSWR from 'swr';
import ListCategoriesSlide from './ListCategoriesSlide';

export default function ListCategories(){
    const { data, error } = useSWR("/listCategories", categoriesService.getCategories);

    if (error) return error;
    if (!data) return<></>;

return (
  <>
    {data.data.categories?.map((category: CategoryType) => (
      <ListCategoriesSlide key={category.id} categoryId={category.id} categoryName={category.name} />
    ))}
  </>
);
}