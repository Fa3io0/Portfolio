<?php
// 1. Configuración del correo
$receiving_email_address = 'fbcanaza@gmail.com'; // **¡IMPORTANTE! Reemplaza con tu dirección de correo**
$subject_prefix = 'Mensaje de Portafolio: ';

// 2. Verificar que el método de la solicitud sea POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // 3. Obtener y sanear los datos del formulario
    // La función 'htmlspecialchars' previene ataques XSS
    $nombre = htmlspecialchars(trim($_POST['nombre']));
    $email = htmlspecialchars(trim($_POST['email']));
    $mensaje = htmlspecialchars(trim($_POST['mensaje']));

    // 4. Validaciones básicas
    if (empty($nombre) || empty($email) || empty($mensaje) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Establecer un mensaje de error y redirigir
        $response = array('status' => 'error', 'message' => 'Por favor, completa todos los campos correctamente.');
        echo json_encode($response);
        exit;
    }

    // 5. Construcción del contenido del correo
    $asunto = $subject_prefix . $nombre;
    
    $cuerpo_mensaje = "Has recibido un nuevo mensaje desde el formulario de contacto de tu portafolio.\n\n";
    $cuerpo_mensaje .= "Nombre: $nombre\n";
    $cuerpo_mensaje .= "Email: $email\n";
    $cuerpo_mensaje .= "Mensaje:\n$mensaje\n";

    // 6. Encabezados del correo
    $headers = "From: " . $nombre . " <" . $email . ">\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 7. Envío del correo
    if (mail($receiving_email_address, $asunto, $cuerpo_mensaje, $headers)) {
        // Éxito
        $response = array('status' => 'success', 'message' => '¡Gracias! Tu mensaje ha sido enviado con éxito.');
        // Opcionalmente, podrías redirigir al usuario a una página de agradecimiento:
        // header('Location: thanks.html'); 
    } else {
        // Fallo en el envío (problema del servidor)
        $response = array('status' => 'error', 'message' => 'Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.');
    }
    
    // Devolver la respuesta (útil si usas JavaScript/AJAX)
    echo json_encode($response);

} else {
    // Si alguien intenta acceder al script directamente
    http_response_code(405); // Método no permitido
    $response = array('status' => 'error', 'message' => 'El método de solicitud no es válido.');
    echo json_encode($response);
}
?>