import React, { useState, useMemo } from 'react';
import { AlertCircle, Clock, ChevronDown, Filter } from 'lucide-react';

// Datos de ejemplo
const initialTickets = [
  {
    id: 1,
    title: "Error en el sistema de pagos",
    priority: "critical",
    createdAt: new Date("2025-10-20"),
    description: "Los usuarios no pueden procesar pagos con tarjeta de crédito. Error 500 en el gateway de pago.",
    assignedTo: "Laura Carbajal",
    status: "En progreso"
  },
  {
    id: 2,
    title: "Actualizar documentación de API",
    priority: "low",
    createdAt: new Date("2025-10-15"),
    description: "La documentación de la API v2 necesita actualizarse con los nuevos endpoints.",
    assignedTo: "María García",
    status: "Pendiente"
  },
  {
    id: 3,
    title: "Bug en dashboard de analytics",
    priority: "high",
    createdAt: new Date("2025-10-22"),
    description: "Las métricas de conversión no se están mostrando correctamente en el dashboard.",
    assignedTo: "Carlos López",
    status: "En progreso"
  },
  {
    id: 4,
    title: "Mejorar rendimiento de búsqueda",
    priority: "medium",
    createdAt: new Date("2025-10-18"),
    description: "La búsqueda de productos tarda más de 3 segundos en cargar resultados.",
    assignedTo: "Ana Martínez",
    status: "Pendiente"
  },
  {
    id: 5,
    title: "Error de autenticación en móvil",
    priority: "critical",
    createdAt: new Date("2025-10-23"),
    description: "Los usuarios de iOS no pueden iniciar sesión en la aplicación móvil.",
    assignedTo: "Luis Rodríguez",
    status: "Nuevo"
  },
  {
    id: 6,
    title: "Añadir exportación a Excel",
    priority: "medium",
    createdAt: new Date("2025-10-10"),
    description: "Los usuarios solicitan poder exportar reportes en formato Excel.",
    assignedTo: "Sofia Torres",
    status: "Pendiente"
  },
  {
    id: 7,
    title: "Optimizar imágenes del sitio",
    priority: "low",
    createdAt: new Date("2025-10-05"),
    description: "Las imágenes del sitio web están ralentizando la carga de páginas.",
    assignedTo: "Pedro Sánchez",
    status: "Pendiente"
  },
  {
    id: 8,
    title: "Error en notificaciones push",
    priority: "high",
    createdAt: new Date("2025-10-21"),
    description: "Las notificaciones push no se están enviando a usuarios de Android.",
    assignedTo: "Laura Fernández",
    status: "En revisión"
  }
];

const priorityConfig = {
  critical: { label: "Crítica", color: "bg-red-500", textColor: "text-red-500", borderColor: "border-red-500" },
  high: { label: "Alta", color: "bg-orange-500", textColor: "text-orange-500", borderColor: "border-orange-500" },
  medium: { label: "Media", color: "bg-yellow-500", textColor: "text-yellow-500", borderColor: "border-yellow-500" },
  low: { label: "Baja", color: "bg-blue-500", textColor: "text-blue-500", borderColor: "border-blue-500" }
};



const TicketSystem = () => {
  const [tickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [assignedFilter, setAssignedFilter] = useState("all");
  const filteredAndSortedTickets = useMemo(() => {
    let filtered = tickets;

    if (priorityFilter !== "all") {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sortOrder === "newest") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }
    });

    return sorted;
  }, [tickets, priorityFilter, sortOrder]);

  const getTicketsByPriority = (priority) => {
    return filteredAndSortedTickets.filter(ticket => ticket.priority === priority);
  };

  const formatDate = (date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Hoy";
    if (days === 1) return "Ayer";
    if (days < 7) return `Hace ${days} días`;
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const TicketCard = ({ ticket }) => (
    <div
      onClick={() => setSelectedTicket(ticket)}
      className={`bg-white border-l-4 ${priorityConfig[ticket.priority].borderColor} rounded-lg p-4 mb-3 cursor-pointer hover:shadow-lg transition-shadow duration-200`}
    >
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-gray-800 text-sm mb-2 flex-1">{ticket.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${priorityConfig[ticket.priority].color} text-white font-medium ml-2`}>
          {priorityConfig[ticket.priority].label}
        </span>
      </div>
      <div className="flex items-center text-xs text-gray-500 mt-2">
        <Clock className="w-3 h-3 mr-1" />
        {formatDate(ticket.createdAt)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Sistema de Tickets</h1>
          <p className="text-gray-600">Gestiona y organiza tus tickets por prioridad</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filtros:</span>
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setPriorityFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  priorityFilter === "all" 
                    ? "bg-gray-800 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Todas
              </button>
              {Object.entries(priorityConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setPriorityFilter(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    priorityFilter === key 
                      ? `${config.color} text-white` 
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-gray-600">Ordenar:</span>
              <button
                onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
                className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors"
              >
                {sortOrder === "newest" ? "Más recientes" : "Más antiguos"}
                <ChevronDown className={`w-4 h-4 transition-transform ${sortOrder === "oldest" ? "rotate-180" : ""}`} />
              </button>
            </div>
            <div className="ml-auto flex items-left gap-2">
              <span className="text-sm text-gray-600">Colaborador:</span>
              <button
                onClick={() => setAssignedFilter("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  assignedFilter === "all"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Todas
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de tickets */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Crítica */}
              {getTicketsByPriority("critical").length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <h2 className="text-lg font-bold text-gray-800">Crítica</h2>
                    <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold">
                      {getTicketsByPriority("critical").length}
                    </span>
                  </div>
                  {getTicketsByPriority("critical").map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              )}

              {getTicketsByPriority("high").length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <h2 className="text-lg font-bold text-gray-800">Alta</h2>
                    <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full font-semibold">
                      {getTicketsByPriority("high").length}
                    </span>
                  </div>
                  {getTicketsByPriority("high").map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              )}

              {/* Media */}
              {getTicketsByPriority("medium").length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <h2 className="text-lg font-bold text-gray-800">Media</h2>
                    <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-semibold">
                      {getTicketsByPriority("medium").length}
                    </span>
                  </div>
                  {getTicketsByPriority("medium").map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              )}

              {/* Baja */}
              {getTicketsByPriority("low").length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-blue-500" />
                    <h2 className="text-lg font-bold text-gray-800">Baja</h2>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-semibold">
                      {getTicketsByPriority("low").length}
                    </span>
                  </div>
                  {getTicketsByPriority("low").map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              )}
            </div>

            {filteredAndSortedTickets.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay tickets con los filtros seleccionados</p>
              </div>
            )}
          </div>

          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              {selectedTicket ? (
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex-1">{selectedTicket.title}</h2>
                    <button
                      onClick={() => setSelectedTicket(null)}
                      className="text-gray-400 hover:text-gray-600 ml-2"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-gray-500 uppercase font-semibold">Prioridad</span>
                      <div className="mt-1">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${priorityConfig[selectedTicket.priority].color} text-white`}>
                          {priorityConfig[selectedTicket.priority].label}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-gray-500 uppercase font-semibold">Fecha de creación</span>
                      <p className="mt-1 text-gray-800">{formatDate(selectedTicket.createdAt)}</p>
                    </div>

                    <div>
                      <span className="text-xs text-gray-500 uppercase font-semibold">Estado</span>
                      <p className="mt-1 text-gray-800">{selectedTicket.status}</p>
                    </div>

                    <div>
                      <span className="text-xs text-gray-500 uppercase font-semibold">Asignado a</span>
                      <p className="mt-1 text-gray-800">{selectedTicket.assignedTo}</p>
                    </div>

                    <div>
                      <span className="text-xs text-gray-500 uppercase font-semibold">Descripción</span>
                      <p className="mt-2 text-gray-700 leading-relaxed">{selectedTicket.description}</p>
                    </div>

                    <div className="pt-4 border-t">
                      <span className="text-xs text-gray-500 uppercase font-semibold">ID del Ticket</span>
                      <p className="mt-1 text-gray-600 font-mono text-sm">#{selectedTicket.id}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Selecciona un ticket para ver sus detalles</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSystem;