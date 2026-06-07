import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export function useCrud(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/${endpoint}/`);
      setItems(res.data);
    } catch (e) {
      setError(e.response?.data || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => { load(); }, [load]);

  const create = async (data) => {
    const isFile = data instanceof FormData;
    const res = await api.post(`/api/${endpoint}/`, data,
      isFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
    );
    setItems(prev => [...prev, res.data]);
    return res.data;
  };

  const update = async (id, data) => {
    const isFile = data instanceof FormData;
    const res = await api.patch(`/api/${endpoint}/${id}/`, data,
      isFile ? { headers: { 'Content-Type': 'multipart/form-data' } } : {}
    );
    setItems(prev => prev.map(i => i.id === id ? res.data : i));
    return res.data;
  };

  const remove = async (id) => {
    await api.delete(`/api/${endpoint}/${id}/`);
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return { items, loading, error, reload: load, create, update, remove };
}
