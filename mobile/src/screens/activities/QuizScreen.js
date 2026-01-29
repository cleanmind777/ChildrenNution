import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, RadioButton } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../config/api';

export default function QuizScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { child, mealType, quiz } = route.params;
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const questions = JSON.parse(quiz.questions || '[]');

  const handleAnswer = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const handleSubmit = async () => {
    // Check if all questions answered
    if (Object.keys(answers).length < questions.length) {
      return;
    }

    setSubmitting(true);

    try {
      // Complete activity
      await api.post('/api/activities/complete', {
        child_id: child.id,
        activity_type: 'quiz',
        quiz_id: quiz.id,
      });

      navigation.navigate('Camera', { child, mealType });
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          {quiz.title}
        </Text>
        {quiz.description && (
          <Text variant="bodyMedium" style={styles.description}>
            {quiz.description}
          </Text>
        )}

        {questions.map((question, index) => (
          <Card key={index} style={styles.questionCard}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.questionText}>
                {question.question}
              </Text>
              <RadioButton.Group
                onValueChange={(value) => handleAnswer(index, value)}
                value={answers[index] || ''}
              >
                {question.options?.map((option, optIndex) => (
                  <View key={optIndex} style={styles.option}>
                    <RadioButton value={option} />
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
                ))}
              </RadioButton.Group>
            </Card.Content>
          </Card>
        ))}

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={submitting}
          disabled={submitting || Object.keys(answers).length < questions.length}
          style={styles.button}
        >
          Submit Quiz
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
    color: '#666',
  },
  questionCard: {
    marginBottom: 15,
  },
  questionText: {
    marginBottom: 15,
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    marginLeft: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 5,
  },
});
