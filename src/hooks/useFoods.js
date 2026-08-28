import { useCallback, useEffect, useState } from "react";
import {
  getFoods,
  getCategories,
} from "../services/foodService";

const useFoods = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchFoods = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [foodResponse, categoryResponse] =
        await Promise.all([
          getFoods(),
          getCategories(),
        ]);

      setFoods(foodResponse?.data || []);

      setCategories(
        categoryResponse?.data ||
          categoryResponse ||
          []
      );
    } catch (err) {
      console.error("Fetch foods error:", err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Gagal mengambil data makanan."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(fetchFoods, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchFoods]);

  return {
    foods,
    categories,
    loading,
    error,
    setFoods,
    fetchFoods,
  };
};

export default useFoods;