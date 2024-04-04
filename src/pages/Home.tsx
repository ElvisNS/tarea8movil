import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonInput, IonButton, IonList, IonItem, IonLabel, IonModal } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  const [fecha, setFecha] = useState<string>('');
  const [titulo, setTitulo] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [foto, setFoto] = useState<string>('');
  const [eventos, setEventos] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Simulación de eventos guardados localmente
  useEffect(() => {
    const savedEvents = localStorage.getItem('eventos');
    if (savedEvents) {
      setEventos(JSON.parse(savedEvents));
    }
  }, []);

  const handleGuardarEvento = () => {
    // Validar campos
    if (!fecha || !titulo || !descripcion || !foto) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    // Guardar evento localmente
    const nuevoEvento = { fecha, titulo, descripcion, foto };
    setEventos([...eventos, nuevoEvento]);
    localStorage.setItem('eventos', JSON.stringify([...eventos, nuevoEvento]));

    // Limpiar campos
    setFecha('');
    setTitulo('');
    setDescripcion('');
    setFoto('');
  };

  const handleEventoSeleccionado = (evento: any) => {
    setSelectedEvent(evento);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Registrar Evento</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Fecha</IonLabel>
            <IonInput type="date" value={fecha} onIonChange={(e) => setFecha(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Título</IonLabel>
            <IonInput value={titulo} onIonChange={(e) => setTitulo(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Descripción</IonLabel>
            <IonInput value={descripcion} onIonChange={(e) => setDescripcion(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Foto</IonLabel>
            <input type="file" accept="image/*" onChange={(e) => setFoto(URL.createObjectURL(e.target.files![0]))} />
          </IonItem>
          {foto && <img src={foto} alt="Foto del evento" className="foto-preview" />}
          <IonItem>
            <IonButton expand="block" onClick={handleGuardarEvento}>Guardar Evento</IonButton>
          </IonItem>
        </IonList>

        {/* Lista de eventos */}
        <IonList>
          {eventos.map((evento, index) => (
            <IonItem key={index} onClick={() => handleEventoSeleccionado(evento)}>
              <IonLabel>{evento.titulo}</IonLabel>
            </IonItem>
          ))}
        </IonList>

        {/* Modal para mostrar detalles del evento */}
        <IonModal isOpen={selectedEvent !== null}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Detalles del Evento</IonTitle>
              <IonButton slot="end" onClick={() => setSelectedEvent(null)}>Cerrar</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>
                <IonLabel>Fecha: {selectedEvent?.fecha}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Título: {selectedEvent?.titulo}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Descripción: {selectedEvent?.descripcion}</IonLabel>
              </IonItem>
              {selectedEvent?.foto && (
                <IonItem>
                  <img src={selectedEvent?.foto} alt="Foto del evento" className="foto-preview" />
                </IonItem>
              )}
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
