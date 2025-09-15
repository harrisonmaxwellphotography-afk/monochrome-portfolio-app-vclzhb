
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#FFFFFF',      // Pure white
  secondary: '#CCCCCC',    // Light gray
  accent: '#999999',       // Medium gray
  background: '#000000',   // Pure black
  backgroundAlt: '#111111', // Dark gray
  text: '#FFFFFF',         // White text
  textSecondary: '#999999', // Gray text
  border: '#333333',       // Dark border
  card: '#111111',         // Dark cards
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  textSecondary: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: 2,
    fontFamily: 'Inter_300Light',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 32,
    letterSpacing: 1,
    fontFamily: 'Inter_300Light',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
    fontFamily: 'Inter_400Regular',
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
    fontFamily: 'Inter_400Regular',
  },
  section: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(255, 255, 255, 0.1)',
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  galleryCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    marginVertical: 8,
    width: '100%',
    overflow: 'hidden',
    boxShadow: '0px 4px 12px rgba(255, 255, 255, 0.15)',
    elevation: 4,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.text,
    letterSpacing: 1,
    fontFamily: 'Inter_300Light',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 16,
    zIndex: 1,
    padding: 8,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});
