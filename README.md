# 🌳 Family-Tree Mobile App  

**Family-Tree** is a React Native mobile application that enables you to build and maintain a digital family tree. Effortlessly add family members, include key details, and visualize your family’s relationships on the go. Built with **Expo** and **Supabase**, this app offers a seamless, modern experience for tracking your family history.  

---

## ✨ Features  

- **Add Family Members**: Quickly add members to your family tree, including personal details like name, birthdate, and relationship.
- **Interactive Visualizations**: View your family structure in an intuitive format.
- **Edit & Update**: Modify member details anytime to keep your tree accurate.
- **Supabase Backend**: Fast and reliable storage for your family data.
- **Secure Authentication**: Sign in to ensure your family tree stays private and accessible only to you.
- **Smooth Navigation**: Explore the app with the help of an intuitive navigation system powered by `@react-navigation`.
- **Clean UI**: Styled with `expo-linear-gradient`, `@expo/vector-icons`, and other modern components for a sleek user experience.

---

## 🛠️ Technologies & Packages  

This app leverages the following technologies and dependencies:  

### **Core Technologies**
- **React Native**: Cross-platform mobile development framework.
- **Expo**: Simplified setup and deployment for React Native projects.
- **Supabase**: Backend-as-a-Service for authentication and data management.

### **Key Dependencies**
- **Navigation**: `@react-navigation/native` and `expo-router` for easy navigation between screens.
- **Database Integration**: `@supabase/supabase-js` for real-time and secure backend operations.
- **Async Storage**: `@react-native-async-storage/async-storage` for local data caching.
- **Date Handling**: `@react-native-community/datetimepicker` and `date-fns` for managing and formatting dates.
- **UI Components**: 
  - `expo-linear-gradient` for beautiful gradient backgrounds.
  - `@expo/vector-icons` for modern icons.
  - `react-native-toast-message` for user-friendly toast notifications.
- **Gesture Handling**: `react-native-gesture-handler` and `@gorhom/bottom-sheet` for intuitive gestures and interactions.

---

## 📱 Getting Started  

Follow these steps to set up the *Family-Tree* app on your local machine:  

### Prerequisites  
Ensure you have the following installed:  
- Node.js (v16 or higher)  
- Expo CLI (`npm install -g expo-cli`)  
- A Supabase project for backend setup  

### Installation  

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shahsuvarli/family-tree.git
   cd family-tree
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Supabase**:  
   Create a `.env` file in the root directory and include your Supabase credentials:  
   ```env
   REACT_NATIVE_SUPABASE_URL=<your_supabase_url>
   REACT_NATIVE_SUPABASE_ANON_KEY=<your_anon_key>
   ```

4. **Start the App**:
   ```bash
   expo start
   ```
   Use your mobile device or an emulator to view the app.

---

## 🎯 How to Use  

1. **Sign In**: Authenticate with your account or create a new one.  
2. **Build Your Tree**: Add family members with relevant details like name, date of birth, and relationship.  
3. **Customize Profiles**: Attach photos and other key details to make each profile unique.  
4. **Navigate Seamlessly**: Use the bottom sheet navigation for quick access to key features.  
5. **Edit Anytime**: Modify member details as your family grows or changes.  

---

## 🚀 Future Improvements  

Planned features for future updates:  
- 🌐 **Multi-language Support**  
- 🔄 **Family Tree Sharing**: Collaborate with family members in real-time.  
- 📊 **Statistics**: Analyze family demographics, like age distributions and relationships.  

---

## 🤝 Contribution  

Contributions are welcome!  

### Steps to Contribute:
1. **Fork the repository**.  
2. **Create a feature branch**:
   ```bash
   git checkout -b feature-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Add feature description"
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature-name
   ```
5. **Open a pull request**.  

---

## 📜 License  

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.  

---

## 📧 Contact  

Have questions or feedback? Reach out:  
- **Email**: shahsuvarli.elvin@gmail.com  
- **GitHub**: [shahsuvarli](https://github.com/shahsuvarli)  

---

Enjoy exploring and building your family history with *Family-Tree*! 🌟  
