// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:soccer_firebase/main.dart';

void main() {
  testWidgets('Form has two fields and button', (WidgetTester tester) async {
    // Build app
    await tester.pumpWidget(const MyApp());

    // fields and button should be present
    expect(find.byType(TextField), findsNWidgets(2));
    expect(find.text('Nome do time'), findsOneWidget);
    expect(find.text('Ano de Fundação'), findsOneWidget);
    expect(find.text('Cadastrar'), findsOneWidget);
  });
}
