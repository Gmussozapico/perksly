import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../context/AuthContext';
import ProviderSelector from '../components/ProviderSelector';
import { Compass, RefreshCw } from 'lucide-react';

export default function Explore() {
  const [userProviderIds, setUserProviderIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUserProviders = useCallback(async () => {
    try {
      const { data } = await api.get('/api/user/providers');
      setUserProviderIds(data.map((p) => p.id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserProviders();
  }, [loadUserProviders]);

  const handleUpdate = () => {
    loadUserProviders();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Explorar Proveedores</h1>
            <p className="text-sm text-gray-500">
              Agrega tus bancos, telefonías y tarjetas para acceder a sus beneficios
            </p>
          </div>
        </div>
        <button
          onClick={handleUpdate}
          className="btn-ghost text-sm hidden sm:flex"
          title="Actualizar"
        >
          <RefreshCw className="w-4 h-4" />
          Actualizar
        </button>
      </div>

      {/* Info banner */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4 mb-8 flex items-start gap-3">
        <div className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5">ℹ️</div>
        <div>
          <p className="text-sm font-medium text-indigo-800">¿Cómo funciona?</p>
          <p className="text-sm text-indigo-600 mt-0.5">
            Selecciona los proveedores que tienes (banco, compañía telefónica, tarjetas retail) y verás todos sus beneficios en tu dashboard y en "Mis Beneficios".
          </p>
        </div>
      </div>

      {/* Current count */}
      {!loading && (
        <div className="flex items-center gap-2 mb-6">
          <div className="h-2 w-2 bg-green-500 rounded-full" />
          <p className="text-sm text-gray-600">
            {userProviderIds.length === 0
              ? 'No tienes proveedores agregados todavía'
              : `Tienes ${userProviderIds.length} proveedor${userProviderIds.length !== 1 ? 'es' : ''} agregado${userProviderIds.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      )}

      {/* Selector */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="flex gap-3 mb-3">
                <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded w-4/5 mb-4" />
              <div className="h-10 bg-gray-200 rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <ProviderSelector userProviderIds={userProviderIds} onUpdate={handleUpdate} />
      )}
    </div>
  );
}
