import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Cadastro de Time de Futebol',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // TRY THIS: Try running your application with "flutter run". You'll see
        // the application has a purple toolbar. Then, without quitting the app,
        // try changing the seedColor in the colorScheme below to Colors.green
        // and then invoke "hot reload" (save your changes or press the "hot
        // reload" button in a Flutter-supported IDE, or press "r" if you used
        // the command line to start the app).
        //
        // Notice that the counter didn't reset back to zero; the application
        // state is not lost during the reload. To reset the state, use hot
        // restart instead.
        //
        // This works for code too, not just values: Most code changes can be
        // tested with just a hot reload.
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const MyHomePage(title: 'Cadastro de Time de Futebol'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final _teamController = TextEditingController();
  final _yearController = TextEditingController();
  bool _isLoading = false;

  String _formatError(Object error) {
    if (error is FirebaseFunctionsException) {
      final parts = <String>[
        'code=${error.code}',
        if (error.message?.isNotEmpty == true) 'message=${error.message}',
        if (error.details != null) 'details=${error.details}',
      ];
      return parts.join(' | ');
    }

    return error.toString();
  }

  Future<void> _registerTeam() async {
    final name = _teamController.text.trim();
    final year = int.tryParse(_yearController.text.trim());
    if (name.isEmpty || year == null) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('Preencha todos os campos')));
      return;
    }

    setState(() => _isLoading = true);
    try {
      final functions = FirebaseFunctions.instanceFor(
        region: 'southamerica-east1',
      );
      final callable = functions.httpsCallable('addSoccerTeamCallable');
      await callable.call({'name': name, 'foundationYear': year});
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        content: Text('Time cadastrado com sucesso!'),
      ));
      _teamController.clear();
      _yearController.clear();
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Erro ao cadastrar: ${_formatError(e)}'),
      ));
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  void dispose() {
    _teamController.dispose();
    _yearController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _teamController,
              decoration: const InputDecoration(labelText: 'Nome do time'),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _yearController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Ano de Fundação'),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: _isLoading ? null : _registerTeam,
              child: _isLoading
                  ? const CircularProgressIndicator(color: Colors.white)
                  : const Text('Cadastrar'),
            ),
          ],
        ),
      ),
    );
  }
}
