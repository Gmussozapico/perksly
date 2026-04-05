import React, { useState } from 'react';
import { Tag, Percent, DollarSign, Gift, Zap, ChevronDown, ChevronUp, Calendar, FileText } from 'lucide-react';

const typeConfig = {
  PERCENTAGE: {
    icon: Percent,
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    badgeBg: 'bg-green-100 text-green-700',
    label: 'Descuento',
  },
  AMOUNT: {
    icon: DollarSign,
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badgeBg: 'bg-blue-100 text-blue-700',
    label: 'Monto fijo',
  },
  FREEBIE: {
    icon: Gift,
    color: 'text-violet-700',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    badgeBg: 'bg-violet-100 text-violet-700',
    label: 'Regalo',
  },
  SPECIAL: {
    icon: Zap,
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badgeBg: 'bg-orange-100 text-orange-700',
    label: 'Especial',
  },
};

export default function BenefitCard({ benefit }) {
  const [expanded, setExpanded] = useState(false);
  const config = typeConfig[benefit.type] || typeConfig.SPECIAL;
  const Icon = config.icon;

  return (
    <div className={`card border ${config.border} hover:shadow-md transition-all duration-200`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-snug">{benefit.title}</h3>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {benefit.category}
            </p>
          </div>
          <div className={`badge ${config.badgeBg} flex-shrink-0`}>
            {benefit.discount}
          </div>
        </div>

        {/* Provider info */}
        {benefit.provider && (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-md flex items-center justify-center">
              <span className="text-indigo-700 font-bold text-xs">
                {benefit.provider.name.charAt(0)}
              </span>
            </div>
            <span className="text-xs text-gray-600 font-medium">{benefit.provider.name}</span>
            {benefit.provider.category && (
              <span className="text-xs text-gray-400">· {benefit.provider.category.name}</span>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{benefit.description}</p>

        {/* Expandable details */}
        {(benefit.terms || benefit.validUntil) && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Ver menos
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                Ver detalles
              </>
            )}
          </button>
        )}

        {expanded && (
          <div className="mt-3 space-y-2 pt-3 border-t border-gray-100">
            {benefit.terms && (
              <div className="flex gap-2">
                <FileText className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500">{benefit.terms}</p>
              </div>
            )}
            {benefit.validUntil && (
              <div className="flex gap-2 items-center">
                <Calendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <p className="text-xs text-gray-500">
                  Válido hasta: {new Date(benefit.validUntil).toLocaleDateString('es-CL')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
