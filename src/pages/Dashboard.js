import { useState, useEffect } from 'react';
import { onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { collectionRef } from '../config/firebaseConfig';
import CardList from '../components/CardList';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get todos from firebase db
  useEffect(() => {
    setTimeout(() => {
      //get collection data
      const user = JSON.parse(localStorage.getItem('user'));
      const q = query(
        collectionRef,
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      onSnapshot(
        q,
        (snapshot) => {
          const documents = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              doc_id: doc.id
            };
          });
          setIsLoading(false);
          setTodos(documents);
        },
        (err) => {
          console.log(err);
        }
      );
    }, 350);
  }, []);

  return !isLoading ? <CardList todos={todos} /> : <Loader />;
};

export default Dashboard;
