import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Lang = 'en' | 'ar';

type Dictionary = Record<string, string | Record<string, any>>;

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private langSubject = new BehaviorSubject<Lang>('en');
  lang$ = this.langSubject.asObservable();

  private dictionaries: Record<Lang, Dictionary> = {
    en: {
      navbar: {
        home: 'Home',
        products: 'Products',
        cart: 'Cart',
        about: 'About',
        account: 'Account',
        login: 'Login',
        logout: 'Logout',
        searchPlaceholder: 'Search products...',
        langToggle: 'العربية',
        addProduct: 'Add Product'
      },
      main: {
        productsCount: '{{count}} products',
        noProducts: 'No products found.',
        addToCart: 'Add'
      },
      categories: {
        All: 'All',
        Computers: 'Computers',
        Phones: 'Phones',
        Audio: 'Audio',
        Gaming: 'Gaming',
        PlayStation: 'PlayStation',
        Xbox: 'Xbox',
        Accessories: 'Accessories',
        Other: 'Other'
      },
      cart: {
        title: 'Cart',
        empty: 'Your cart is empty.',
        remove: 'Remove',
        clear: 'Clear cart',
        total: 'Total',
        payNow: 'Pay now'
      },
      payment: {
        title: 'Payment',
        cardLabel: 'Card details',
        hint: 'Use test card 4242 4242 4242 4242 with any future expiry date and any CVC.',
        processing: 'Processing...',
        pay: 'Pay now',
        back: 'Back to cart',
        success: 'Payment completed successfully.',
        failed: 'Payment failed.',
        status: 'Payment status',
        total: 'Total charged'
      },
      account: {
        title: 'My Account',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        age: 'Age',
        gender: 'Gender',
        edit: 'Edit Profile',
        logout: 'Logout',
        cancel: 'Cancel',
        save: 'Save Changes'
      },
      auth: {
        loginTitle: 'Login',
        registerTitle: 'Register',
        signInHeading: 'Sign in to Market',
        email: 'Email',
        emailPlaceholder: 'Enter your email',
        password: 'Password',
        passwordPlaceholder: 'Enter your password',
        signIn: 'Sign in',
        demoNote: 'Demo: use any email and password',
        signUpPrompt: "Don't have an account?",
        signUpLink: 'Sign up',
        registerHeading: 'Create Your Account',
        registerSub: 'Join Market today',
        firstName: 'First Name',
        lastName: 'Last Name',
        confirmEmail: 'Confirm Email',
        confirmPassword: 'Confirm Password',
        selectGender: 'Select gender',
        createAccount: 'Create Account',
        haveAccount: 'Already have an account?',
        signInLink: 'Sign in'
      },
      about: {
        title: 'About',
        body: 'This is a demo Angular market application showcasing components, services, and styling.',
        highlight1: 'Built with Angular + Bootstrap',
        highlight2: 'Authenticated cart, product browsing, and checkout flow',
        highlight3: 'Stripe-based payment experience (test mode)',
        highlight4: 'Reusable services for search, cart, and item details',
        highlights: 'Highlights',
        contact: 'Contact',
        email: 'Email',
        supportHours: 'Support hours',
        supportHoursValue: 'Sun–Thu, 9am–6pm',
        version: 'Version'
      },
      notFound: {
        title: '404 - Page not found',
        message: 'The page you requested does not exist.',
        goHome: 'Go home'
      },
      admin: {
        addProduct: 'Add New Product',
        notAllowed: 'You do not have access to add products.',
        name: 'Name',
        price: 'Price',
        description: 'Description',
        imageUrl: 'Image URL',
        imageFile: 'Product Image',
        category: 'Category',
        selectCategory: 'Select category',
        save: 'Save Product',
        saving: 'Saving...',
        required: 'Please fill in all required fields.',
        priceInvalid: 'Price must be greater than 0.',
        success: 'Product added successfully.',
        fail: 'Unable to add product. Please try again.'
      }
    },
    ar: {
      navbar: {
        home: 'الرئيسية',
        products: 'المنتجات',
        cart: 'السلة',
        about: 'من نحن',
        account: 'حسابي',
        login: 'تسجيل الدخول',
        logout: 'تسجيل الخروج',
        searchPlaceholder: 'ابحث عن المنتجات...',
        langToggle: 'English',
        addProduct: 'إضافة منتج'
      },
      main: {
        productsCount: '{{count}} منتج',
        noProducts: 'لا توجد منتجات.',
        addToCart: 'أضف للسلة'
      },
      categories: {
        All: 'الكل',
        Computers: 'كمبيوترات',
        Phones: 'هواتف',
        Audio: 'صوتيات',
        Gaming: 'ألعاب',
        PlayStation: 'بلايستيشن',
        Xbox: 'إكس بوكس',
        Accessories: 'اكسسوارات',
        Other: 'أخرى'
      },
      cart: {
        title: 'السلة',
        empty: 'سلتك فارغة.',
        remove: 'حذف',
        clear: 'إفراغ السلة',
        total: 'الإجمالي',
        payNow: 'ادفع الآن'
      },
      payment: {
        title: 'الدفع',
        cardLabel: 'بيانات البطاقة',
        hint: 'استخدم البطاقة التجريبية 4242 4242 4242 4242 مع تاريخ صلاحية مستقبلي وأي CVC.',
        processing: 'جاري المعالجة...',
        pay: 'ادفع الآن',
        back: 'العودة للسلة',
        success: 'تم الدفع بنجاح.',
        failed: 'فشل الدفع.',
        status: 'حالة الدفع',
        total: 'الإجمالي المدفوع'
      },
      account: {
        title: 'حسابي',
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        email: 'البريد الإلكتروني',
        age: 'العمر',
        gender: 'النوع',
        edit: 'تعديل الحساب',
        logout: 'تسجيل الخروج',
        cancel: 'إلغاء',
        save: 'حفظ التغييرات'
      },
      auth: {
        loginTitle: 'تسجيل الدخول',
        registerTitle: 'إنشاء حساب',
        signInHeading: 'تسجيل الدخول إلى Market',
        email: 'البريد الإلكتروني',
        emailPlaceholder: 'أدخل بريدك الإلكتروني',
        password: 'كلمة المرور',
        passwordPlaceholder: 'أدخل كلمة المرور',
        signIn: 'تسجيل الدخول',
        demoNote: 'تجريبي: استخدم أي بريد وكلمة مرور',
        signUpPrompt: 'ليس لديك حساب؟',
        signUpLink: 'إنشاء حساب',
        registerHeading: 'إنشاء حسابك',
        registerSub: 'انضم إلى Market اليوم',
        firstName: 'الاسم الأول',
        lastName: 'اسم العائلة',
        confirmEmail: 'تأكيد البريد',
        confirmPassword: 'تأكيد كلمة المرور',
        selectGender: 'اختر النوع',
        createAccount: 'إنشاء الحساب',
        haveAccount: 'لديك حساب بالفعل؟',
        signInLink: 'تسجيل الدخول'
      },
      about: {
        title: 'من نحن',
        body: 'تطبيق سوق تجريبي مبني بأنجولار لعرض المكونات والخدمات والتصميم.',
        highlight1: 'مبني باستخدام Angular و Bootstrap',
        highlight2: 'عربة تسوق مع تسجيل دخول وتصفح منتجات وتفاصيل',
        highlight3: 'تجربة دفع عبر Stripe بوضع الاختبار',
        highlight4: 'خدمات قابلة لإعادة الاستخدام للبحث والعربة والتفاصيل',
        highlights: 'أبرز النقاط',
        contact: 'التواصل',
        email: 'البريد الإلكتروني',
        supportHours: 'ساعات الدعم',
        supportHoursValue: 'الأحد - الخميس، 9 ص إلى 6 م',
        version: 'الإصدار'
      },
      notFound: {
        title: '404 - الصفحة غير موجودة',
        message: 'الصفحة التي طلبتها غير متوفرة.',
        goHome: 'العودة للرئيسية'
      },
      admin: {
        addProduct: 'إضافة منتج جديد',
        notAllowed: 'لا تملك صلاحية إضافة المنتجات.',
        name: 'الاسم',
        price: 'السعر',
        description: 'الوصف',
        imageUrl: 'رابط الصورة',
        imageFile: 'صورة المنتج',
        category: 'التصنيف',
        selectCategory: 'اختر التصنيف',
        save: 'حفظ المنتج',
        saving: 'جاري الحفظ...',
        required: 'يرجى تعبئة الحقول المطلوبة.',
        priceInvalid: 'يجب أن يكون السعر أكبر من 0.',
        success: 'تمت إضافة المنتج بنجاح.',
        fail: 'تعذر إضافة المنتج. حاول مرة أخرى.'
      }
    }
  };

  constructor() {
    this.setLanguage('en');
  }

  setLanguage(lang: Lang): void {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    this.langSubject.next(lang);
  }

  translate(key: string, params?: Record<string, string | number>): string {
    const lang = this.langSubject.value;
    const value = this.resolveKey(this.dictionaries[lang], key) ?? this.resolveKey(this.dictionaries.en, key);
    if (typeof value !== 'string') return key;
    if (!params) return value;
    return Object.keys(params).reduce(
      (acc, k) => acc.replace(`{{${k}}}`, String(params[k])),
      value
    );
  }

  private resolveKey(dict: Dictionary, key: string): string | Record<string, any> | undefined {
    return key.split('.').reduce<Record<string, any> | string | undefined>((acc, part) => {
      if (!acc || typeof acc === 'string') return acc;
      return acc[part];
    }, dict);
  }
}
