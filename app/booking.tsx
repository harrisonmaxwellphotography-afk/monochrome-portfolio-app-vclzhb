
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Linking } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Icon from '../components/Icon';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

const sessionTypes = [
  { id: 'studio', title: 'Studio Session', duration: '2 hours', price: '$300' },
  { id: 'fashion', title: 'Fashion Shoot', duration: '3 hours', price: '$500' },
  { id: 'event', title: 'Event Coverage', duration: '4-8 hours', price: '$800+' },
  { id: 'product', title: 'Product Photography', duration: '2-3 hours', price: '$400' },
];

export default function BookingScreen() {
  const router = useRouter();
  const [selectedSessionType, setSelectedSessionType] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleBack = () => {
    console.log('Navigating back from booking');
    router.back();
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      console.log('Date selected:', date);
      setSelectedDate(date);
    }
  };

  const handleSubmit = () => {
    console.log('Booking form submitted:', {
      sessionType: selectedSessionType,
      name,
      email,
      phone,
      date: selectedDate,
      message,
    });

    if (!selectedSessionType || !name || !email) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    const selectedSession = sessionTypes.find(s => s.id === selectedSessionType);
    const emailSubject = encodeURIComponent('Photography Session Booking Request');
    const emailBody = encodeURIComponent(`
Hello Harrison,

I would like to book a photography session with the following details:

Session Type: ${selectedSession?.title} (${selectedSession?.duration}, ${selectedSession?.price})
Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Date: ${formatDate(selectedDate)}

Additional Details:
${message || 'No additional details provided.'}

Please let me know your availability and next steps.

Best regards,
${name}
    `);

    const mailtoUrl = `mailto:harrisonmaxwellphotography@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    Linking.openURL(mailtoUrl).then(() => {
      Alert.alert(
        'Email Client Opened',
        'Your email client has been opened with the booking details. Please send the email to complete your booking request.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }).catch(() => {
      Alert.alert(
        'Email Not Available',
        'Please send an email to harrisonmaxwellphotography@gmail.com with your booking details.',
        [{ text: 'OK' }]
      );
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity
          style={commonStyles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Book a Session</Text>
      </View>

      <ScrollView 
        style={commonStyles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Session Types */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '400', marginBottom: 16 }]}>
            Select Session Type *
          </Text>
          
          {sessionTypes.map((session) => (
            <TouchableOpacity
              key={session.id}
              style={[
                commonStyles.card,
                {
                  borderWidth: 2,
                  borderColor: selectedSessionType === session.id ? colors.primary : colors.border,
                  backgroundColor: selectedSessionType === session.id ? colors.backgroundAlt : colors.card,
                }
              ]}
              onPress={() => {
                console.log('Session type selected:', session.id);
                setSelectedSessionType(session.id);
              }}
              activeOpacity={0.8}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontSize: 16, fontWeight: '500', marginBottom: 4 }]}>
                    {session.title}
                  </Text>
                  <Text style={commonStyles.textSecondary}>
                    {session.duration} • {session.price}
                  </Text>
                </View>
                {selectedSessionType === session.id && (
                  <Icon name="checkmark-circle" size={24} color={colors.primary} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Information */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '400', marginBottom: 16 }]}>
            Contact Information
          </Text>
          
          <View style={{ marginBottom: 16 }}>
            <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>Full Name *</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
                color: colors.text,
                backgroundColor: colors.card,
              }}
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>Email Address *</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
                color: colors.text,
                backgroundColor: colors.card,
              }}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>Phone Number</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 12,
                fontSize: 16,
                color: colors.text,
                backgroundColor: colors.card,
              }}
              value={phone}
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              placeholderTextColor={colors.textSecondary}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Preferred Date */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '400', marginBottom: 16 }]}>
            Preferred Date
          </Text>
          
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: colors.card,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.8}
          >
            <Text style={[commonStyles.text, { fontSize: 16 }]}>
              {formatDate(selectedDate)}
            </Text>
            <Icon name="calendar" size={20} color={colors.textSecondary} />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Additional Message */}
        <View style={commonStyles.section}>
          <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '400', marginBottom: 16 }]}>
            Additional Details
          </Text>
          
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontSize: 16,
              color: colors.text,
              backgroundColor: colors.card,
              height: 100,
              textAlignVertical: 'top',
            }}
            value={message}
            onChangeText={setMessage}
            placeholder="Tell me more about your vision, location preferences, or any special requirements..."
            placeholderTextColor={colors.textSecondary}
            multiline
          />
        </View>

        {/* Submit Button */}
        <View style={commonStyles.section}>
          <TouchableOpacity
            style={[
              buttonStyles.primary,
              {
                width: '100%',
                paddingVertical: 16,
                opacity: (!selectedSessionType || !name || !email) ? 0.6 : 1,
              }
            ]}
            onPress={handleSubmit}
            activeOpacity={0.8}
            disabled={!selectedSessionType || !name || !email}
          >
            <Text style={[buttonStyles.text, { fontSize: 18 }]}>
              Send Booking Request
            </Text>
          </TouchableOpacity>
          
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 12, fontSize: 12 }]}>
            I&apos;ll respond within 24 hours to confirm availability
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
