<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitd5bab4e1bad01b81708fcfca95451e83
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Stripe\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Stripe\\' => 
        array (
            0 => __DIR__ . '/..' . '/stripe/stripe-php/lib',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitd5bab4e1bad01b81708fcfca95451e83::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitd5bab4e1bad01b81708fcfca95451e83::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitd5bab4e1bad01b81708fcfca95451e83::$classMap;

        }, null, ClassLoader::class);
    }
}