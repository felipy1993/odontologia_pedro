import { useState, useEffect, useRef } from 'react';

interface UseAnimateOnScrollOptions extends IntersectionObserverInit {
    triggerOnce?: boolean;
}

/**
 * A custom hook to detect when an element is visible in the viewport.
 * @param options - IntersectionObserver options and a `triggerOnce` flag.
 * @returns A ref to attach to the element and a boolean indicating visibility.
 */
export const useAnimateOnScroll = (options: UseAnimateOnScrollOptions = {}) => {
    const { threshold = 0.1, root = null, rootMargin = '0px', triggerOnce = true } = options;
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce && ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold, root, rootMargin }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    // We only want to re-run the effect if the options change.
    // ref.current is mutable and should not be in the dependency array.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threshold, root, rootMargin, triggerOnce]);

    return { ref, isVisible };
};
