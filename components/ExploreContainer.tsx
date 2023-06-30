import { IonText ,IonButton, useIonViewWillEnter, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';
import React, { useState } from 'react';


interface ContainerProps { }


const ExploreContainer: React.FC<ContainerProps> = () => {

  const [posts, setPosts] = useState([]); 
  
  useIonViewWillEnter(() => {
     fetch('https://wolnelektury.pl/api/books/?format=json')
        .then((res) => res.json())
        .then((data) => {  
          console.log(data);          
          setPosts(data);                     
        })
        .catch((err) => {
           console.log(err.message);
        });
  });

  return (
    <div className="container">      
        {posts.map(p => {
          return (
            <IonGrid>
              <IonRow>
                <IonCol className='col'>  
                  <IonCard className='card'>
                    <IonCardHeader>
                      <img src={p.simple_thumb}/>
                      <IonCardSubtitle>
                        {p.title}
                      </IonCardSubtitle>                      
                      <IonCardTitle>
                        {p.author}
                      </IonCardTitle>
                      <IonCardContent>
                        <IonText>
                          Garunek: <i>{p.genre}</i>
                        </IonText>
                        <br></br>
                        <IonText>
                          Rodzaj literacki: <i>{p.kind}</i>
                        </IonText>
                        <br></br>
                        <IonButton href={p.url} color={'primary'} expand='block' shape='round'>Szczegoly</IonButton>
                      </IonCardContent>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>                                
              </IonRow>
            </IonGrid>
          )})
        }      
    </div>
  );
};

export default ExploreContainer;
